import { SubmitHandler, useForm } from "react-hook-form";
import CustomInputField from "../../CustomInputField";
import ButtonComponent from "../../ButtonComponent";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";

import { useState } from "react";
import { useLoginMutation } from "../common/authentication-api";
import { storeAccessToken } from "../../../utils/api/auth";
//import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/ui/notifications";
import { IErrorData } from "../common/auth";

type LoginFormFields = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  //hooks
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const response = await login(data);
      if (response && response.data) {
        storeAccessToken(response.data);
        showToast({ message: "Login Successful", type: "success" });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
        //window.location.href = "/dashboard";
      } else {
        const error = response.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-primary-color h-screen px-9 flex flex-col lg:p-12 justify-center items-center">
      <div className="flex flex-col justify-center  lg:flex-row  bg-black/10 border rounded-lg  border-gray-300 lg:h-4/5 w-full  lg:w-3/5 shadow-xl overflow-hidden">
        <div className=" lg:flex-grow flex flex-col items-center lg:w-3/5 ">
          <img className="w-52" src="/assets/images/desk-location.png" />
          <p className="text-white font-semibold text-lg ">Welcome</p>
          <p className="text-white text-sm px-6 text-center lg:block hidden ">
            Optimize workforce management with our comprehensive platform,
            enabling you to seamlessly track attendance using geofencing
            technology, communicate instantly with an integrated chat system,
            and enhance productivity, all in one streamlined solution.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center bg-[#e2ffff]  lg:w-2/5">
          <div className="flex flex-col gap-2 items-center">
            <p className="text-black font-semibold text-lg">Login</p>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="">
              <div className="flex flex-col gap-1 justify-between">
                <CustomInputField<LoginFormFields>
                  register={register}
                  name="email"
                  customClass="flex-1"
                  type="text"
                  label="Email"
                  rules={{ required: "Field required" }}
                  errors={errors}
                />

                <CustomInputField<LoginFormFields>
                  register={register}
                  {...register("password")}
                  customClass="flex-1"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  rules={{ required: "Field required" }}
                  errors={errors}
                  suffixIcon={
                    <>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </>
                  }
                />
              </div>

              <div className="py-4 flex flex-row justify-end">
                <ButtonComponent
                  disabled={isSubmitting}
                  type="submit"
                  btnHeight="small"
                  bgColor="primary"
                >
                  <span className="capitalize text-sm">
                    {isSubmitting || isLoading ? "Logging in..." : "Login"}
                  </span>
                </ButtonComponent>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
