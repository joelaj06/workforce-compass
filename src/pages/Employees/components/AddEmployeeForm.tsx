import { ButtonComponent, CustomInputField } from "../../../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddUserMutation } from "../common/users-api";
import { AddUserReqeustPayload } from "../common/employee";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";

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

  const [addUser, { isLoading }] = useAddUserMutation();

  const addNewUser = async (payload: AddUserReqeustPayload) => {
    try {
      const res = await addUser(payload);
      if (res && res.data) {
        showToast({ message: "User created successfully", type: "success" });
        isSubmitted(true);
      } else {
        const error = res.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (error) {
      showToast({ message: "Sorry an error occurred", type: "error" });
    }
  };

  const onSubmit: SubmitHandler<AddUserFormFileds> = async (data) => {
    const payload: AddUserReqeustPayload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      address: data.address,
      job_title: data.job_title,
      phone: data.phone,
      password: "defaultUser",
      role: "63332c630f6ba9ca7fdea4e5",
      status: "active",
      confirmPassword: "defaultUser",
    };
    await addNewUser(payload);
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

        <div className="py-4 flex flex-row justify-between gap-1 items-end">
          <div>
            <p className="text-gray-600 text-xs italic bg-emerald-400 p-2 rounded">
              Note: New Users will be assigned this password{" "}
              <span className="font-bold">defaultUser</span> by default. They
              can change this when they sign in..
            </p>
          </div>
          <ButtonComponent
            disabled={isSubmitting || isLoading}
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
