import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCabin} from "@/services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "@/ui/FormRow.jsx";
import Input from "@/ui/Input.jsx";
import Form from "@/ui/Form.jsx";
import Textarea from "@/ui/Textarea.jsx";
import FileInput from "@/ui/FileInput.jsx";
import Button from "@/ui/Button.jsx";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: {errors},
    setValue
  } = useForm()

  const queryClient = useQueryClient();
  const {isLoading: isCreating, mutate} = useMutation({
    mutationFn: newCabin => createCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created")
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      })
      reset();
      setValue("discount", 0)
    },
    onError: error => {
      toast.error(error.message)
    }
  })

  function onSubmit(data) {
    mutate({...data, image: data.image[0]})
    // console.log(data.image[0])
  }

  function onError(errors) {
    // console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", {
          required: "this field is required"
        })} disabled={isCreating}/>
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "this field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} disabled={isCreating}/>
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "this field is required",
          min: {
            value: 1,
            message: "Price should be at least 1"
          }
        })} disabled={isCreating}/>
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "this field is required",
          validate: (value) => {
            if (Number(value) < 0) return "Discount should be at least 0"
            return Number(value) <= Number(getValues().regularPrice) || "Discount should be less than regular price"
          }
        })} disabled={isCreating}/>
      </FormRow>

      <FormRow label={"Description for website"}>
        <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "this field is required"
        })} disabled={isCreating}/>
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image")}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
