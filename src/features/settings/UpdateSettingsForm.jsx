import Form from "@/ui/Form.jsx";
import FormRow from "@/ui/FormRow.jsx";
import Input from "@/ui/Input.jsx";
import {useSettings} from "@/features/settings/useSettings.js";
import Spinner from "@/ui/Spinner.jsx";
import {useForm} from "react-hook-form";
import {useUpdateSettings} from "@/features/settings/useUpdateSettings.js";

function UpdateSettingsForm() {
  const {settings: {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice
  } = {}, isLoading} = useSettings();
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm();
  const {isUpdating, updateSettings} = useUpdateSettings();

  if (isLoading) return <Spinner/>

  function handleUpdate(data) {
    updateSettings(data);
  }

  return (
    <Form>
      <FormRow
        label='Minimum nights/booking'
        error={errors?.minBookingLength?.message}>
        <Input
          disabled={isUpdating}
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            required: true,
            min: {
              value: 1,
              message: "should greater than 0"
            }
          })}
          type='number'
          id='min-nights'
          onBlur={handleSubmit(handleUpdate)}/>
      </FormRow>

      <FormRow
        label='Maximum nights/booking'
        error={errors?.maxBookingLength?.message}>
        <Input
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          type='number'
          id='max-nights'
          {...register("maxBookingLength", {
            required: true,
            min: {
              value: 1,
              message: "should greater than 0"
            }
          })}
          onBlur={handleSubmit(handleUpdate)}
        />
      </FormRow>

      <FormRow
        label='Maximum guests/booking'
        error={errors?.maxGuestsPerBooking?.message}>
        <Input
          {...register("maxGuestsPerBooking", {
            required: true,
            min: {
              value: 1,
              message: "should greater than 0"
            }
          })}
          onBlur={handleSubmit(handleUpdate)}
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          type='number'
          id='max-guests'
          />
      </FormRow>

      <FormRow
        label='Breakfast price'
        error={errors?.breakfastPrice?.message}>
        <Input
          {...register("breakfastPrice", {
            required: true,
            min: {
              value: 1,
              message: "should greater than 0"
            }
          })}
          onBlur={handleSubmit(handleUpdate)}
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          type='number'
          id='breakfast-price'
          />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
