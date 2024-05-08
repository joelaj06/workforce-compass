import { ButtonComponent, CustomInputField } from "../../../components";
import { SubmitHandler, useForm } from "react-hook-form";

type AddUserFormFileds = {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  job_title: string;
  phone: string;
};

interface AddEmployeeFormProps {
  isSubmitted: (value: boolean) => void;
}

const AddEmployeeForm = ({ isSubmitted }: AddEmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormFileds>();

  const onSubmit: SubmitHandler<AddUserFormFileds> = async (data) => {
    //set a timeout for a promise
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    isSubmitted(true);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="flex gap-1 justify-between">
          <CustomInputField<AddUserFormFileds>
            register={register}
            name="first_name"
            customClass="flex-1"
            type="text"
            label="First Name"
            rules={{ required: "Field required" }}
            errors={errors}
          />

          <CustomInputField<AddUserFormFileds>
            register={register}
            {...register("last_name")}
            customClass="flex-1"
            name="last_name"
            type="text"
            label="Last Name"
            rules={{ required: "Field required" }}
            errors={errors}
          />
        </div>
        <div className="flex gap-1">
          <CustomInputField<AddUserFormFileds>
            register={register}
            customClass="flex-1"
            name="email"
            type="email"
            label="Email"
            rules={{ required: "Field required" }}
            errors={errors}
          />

          <CustomInputField<AddUserFormFileds>
            register={register}
            customClass="flex-1"
            name="address"
            type="address"
            label="Address"
            rules={{ required: "Field required" }}
            errors={errors}
          />
        </div>
        <div className="flex gap-1">
          <CustomInputField<AddUserFormFileds>
            register={register}
            customClass="flex-1"
            name="job_title"
            type="text"
            label="Designation"
            rules={{ required: "Field required" }}
            errors={errors}
          />
          <CustomInputField<AddUserFormFileds>
            register={register}
            customClass="flex-1"
            name="phone"
            type="text"
            label="Phone"
            rules={{ required: "Field required" }}
            errors={errors}
          />
        </div>

        <div className="py-4 flex flex-row justify-end">
          <ButtonComponent
            disabled={isSubmitting}
            type="submit"
            btnHeight="small"
            bgColor="primary"
          >
            <span className="capitalize text-sm">Save User</span>
          </ButtonComponent>
        </div>
      </form>
    </>
  );
};

export default AddEmployeeForm;
