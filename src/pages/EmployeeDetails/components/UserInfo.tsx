import { useForm, SubmitHandler } from "react-hook-form";
import { CustomInputField, ButtonComponent } from "../../../components";
import { IRole, IUser } from "../../Employees/common/employee";
import { ChangeEvent, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import {
  useLazyGetRolesQuery,
  useUpdateUserMutation,
} from "../../Employees/common/users-api";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import DropDownComponent from "../../../components/DropDownComponent";

interface UserInfoProps {
  user: IUser;
}

type UpdateUserFormFileds = {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  job_title: string;
  phone: string;
};
const UserInfo = ({ user }: UserInfoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserFormFileds>({
    defaultValues: user,
  });

  const [getRoles] = useLazyGetRolesQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [roles, setRoles] = useState<IRole[]>([]);
  const [selectedRole, setSeletedRole] = useState<IRole>(
    user.role ? user.role : ({} as IRole)
  );

  const roleOptions = roles.map((role) => {
    return { value: role._id, label: role.name };
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files as FileList;
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setSelectedImage(reader.result as string);
      }
    };

    reader.readAsDataURL(file[0]);
  };

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      if (res && res.data) {
        setRoles(res.data);
      } else {
        const error = res.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (error) {
      if (error)
        showToast({ message: "Sorry an error occurred", type: "error" });
    }
  };

  const handleUserUpdate = async (payload: IUser) => {
    try {
      const res = await updateUser(payload);
      if (res && res.data) {
        showToast({ message: "User updated successfully", type: "success" });
      } else {
        const error = res.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const onSubmit: SubmitHandler<UpdateUserFormFileds> = async (data) => {
    const base64String = selectedImage.replace(
      /^data:image\/[a-zA-Z]+;base64,/,
      ""
    );
    const payload: IUser = {
      id: user._id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      address: data.address,
      job_title: data.job_title,
      _id: user._id,
      phone: data.phone,
      location: data.address,
      status: user.status,
      image: base64String,
      role: selectedRole,
    };
    handleUserUpdate(payload);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      <div className="flex flex-col p-3 bg-white rounded-md shadow-sm flex-grow">
        <form action="" onSubmit={handleSubmit(onSubmit)} className="p-3">
          <div className="mb-7 bg-[var(--primary-color-shade900)] p-4 rounded-lg flex flex-col items-center">
            <div className="flex flex-col gap-1 items-center">
              <Avatar
                sx={{
                  width: "120px",
                  height: "120px",
                }}
              >
                {selectedImage ? (
                  <Avatar
                    src={selectedImage}
                    sx={{ width: "130px", height: "130px", color: "gray" }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: "130px",
                      height: "130px",
                      color: "gray",
                      backgroundColor: "var(--color-background)",
                    }}
                  />
                )}
              </Avatar>
              <div className="bg-white rounded-full w-10 h-10 p-1  shadow-md flex flex-col justify-center items-center">
                <label htmlFor="fileInput">
                  <PhotoCameraOutlinedIcon
                    sx={{ fontSize: "16px", color: "var(--color-primary)" }}
                    className="text-gray-600 cursor-pointer"
                  />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-1 justify-between">
            <CustomInputField<UpdateUserFormFileds>
              register={register}
              name="first_name"
              customClass="flex-1"
              type="text"
              label="First Name"
              rules={{ required: "Field required" }}
              errors={errors}
            />

            <CustomInputField<UpdateUserFormFileds>
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
            <CustomInputField<UpdateUserFormFileds>
              register={register}
              customClass="flex-1"
              name="email"
              type="email"
              label="Email"
              rules={{ required: "Field required" }}
              errors={errors}
            />

            <CustomInputField<UpdateUserFormFileds>
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
            <CustomInputField<UpdateUserFormFileds>
              register={register}
              customClass="flex-1"
              name="job_title"
              type="text"
              label="Designation"
              rules={{ required: "Field required" }}
              errors={errors}
            />
            <CustomInputField<UpdateUserFormFileds>
              register={register}
              customClass="flex-1"
              name="phone"
              type="text"
              label="Phone"
              rules={{ required: "Field required" }}
              errors={errors}
            />
          </div>
          <div>
            <label className="block text-sm ">Role</label>
            <DropDownComponent
              label={user.role?.name || "Role"}
              options={roleOptions}
              onChanged={(val) => {
                const role = roles.find((r) => r._id == val?.value);
                setSeletedRole(role!);
              }}
            />
          </div>

          <div className="py-4 flex flex-row justify-end">
            <ButtonComponent
              disabled={isSubmitting || isLoading}
              type="submit"
              btnHeight="small"
              bgColor="primary"
            >
              <span className="capitalize text-sm">Update User</span>
            </ButtonComponent>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserInfo;
