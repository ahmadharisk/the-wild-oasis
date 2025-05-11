import {useForm} from "react-hook-form";
import FormRow from "@/ui/FormRow.jsx";
import Input from "@/ui/Input.jsx";
import Form from "@/ui/Form.jsx";
import Textarea from "@/ui/Textarea.jsx";
import FileInput from "@/ui/FileInput.jsx";
import Button from "@/ui/Button.jsx";
import PropTypes from "prop-types";
import {useCreateCabin} from "@/features/cabins/useCreateCabin.js";
import {useUpdateCabin} from "@/features/cabins/useUpdateCabin.js";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {

  const {id: editId, ...editValues} = cabinToEdit

  const isEditSession = Boolean(editId)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: {errors},
    setValue
  } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })

  const {isCreating, createCabin} = useCreateCabin();

  const {isUpdating, updateCabin} = useUpdateCabin();

  const isWorking = isCreating || isUpdating

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0]

    if (isEditSession) updateCabin({
      newCabinData: {...data, image},
      id: editId,
      existingImage: cabinToEdit.image
    }, {
      onSuccess: () => {
        onCloseModal?.();
      }
    })
    else createCabin({...data, image: image}, {
      onSuccess: () => {
        reset();
        setValue("discount", 0);
        onCloseModal?.();
      }
    })
  }

  function onError() { // menerima errors
    // console.log(errors)
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", {
          required: "this field is required"
        })} disabled={isWorking}/>
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "this field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} disabled={isWorking}/>
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "this field is required",
          min: {
            value: 1,
            message: "Price should be at least 1"
          }
        })} disabled={isWorking}/>
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "this field is required",
          validate: (value) => {
            if (Number(value) < 0) return "Discount should be at least 0"
            return Number(value) <= Number(getValues().regularPrice) || "Discount should be less than regular price"
          }
        })} disabled={isWorking}/>
      </FormRow>

      <FormRow label={"Description for website"} error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "this field is required"
        })} disabled={isWorking}/>
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "this field is required"
          })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit" : "Create new"} cabin</Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string
  }),
  onCloseModal: PropTypes.func
}

export default CreateCabinForm;
