import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "../../components/uiPrimitives/button";
import InputField from "../../components/uiPrimitives/fields/InputField";
import Logo from "../../components/uiPrimitives/logo/Logo";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { CONFIRM_RESET_PASSWORD_API } from "../../services/api/const";
import { resetPasswordSchema } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ConfirmResetPassword() {
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const navigate = useNavigate();
  const [mailSent, setMailSent] = useState([]);
  const passwordResetConfirmFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      handlePasswordResetConfirm(values);
    },
  });
  const handlePasswordResetConfirm = async (values) => {
    const response = await axiosInstance.post(
      `${CONFIRM_RESET_PASSWORD_API}?code=${code}`,
      values
    );
    if (response.status == 200) {
      navigate("/auth/login");
    }
  };

  return (
    <div className="relative w-screen overflow-hidden bg-white flex flex-col gap-12 items-center mx-h-screen">
      <div className="w-full fixed top-0 px-10 py-2 border-b bg-white z-10">
        <Logo extra="!m-0 !w-32" />
      </div>

      <div className=" relative mt-28 border-solid border-[#d7d7d7] flex flex-col gap-1  shrink-0 items-center  border lg:w-1/4 md:w-1/3 sm-w-full p-10">
        <div className="flex flex-col  items-center text-center">
          <p className="text-base font-bold pb-3">Create a strong password</p>
          <p className="text-xs">
            Your password must be at least six characters and should include a
            combination of numbers, letters and special characters (!$@％).
          </p>
        </div>
        <form
          onSubmit={passwordResetConfirmFormik.handleSubmit}
          className="flex flex-col gap-8 w-full m-12 mt-2">
          <div className="flex flex-col gap-4 w-full items-center">
            <div className=" w-full flex flex-col justify-center ">
              <InputField
                placeholder="New Password"
                extra="w-full rounded"
                id="password"
                name="password"
                type="password"
                state={
                  passwordResetConfirmFormik.touched.password &&
                  passwordResetConfirmFormik.errors.password
                    ? "error"
                    : "success"
                }
                onChange={passwordResetConfirmFormik.handleChange}
                onBlur={passwordResetConfirmFormik.handleBlur}
                value={passwordResetConfirmFormik.values.password}
              />
            </div>
            <div className=" w-full flex flex-col justify-center ">
              <InputField
                placeholder="New Password again"
                extra="w-full rounded"
                id="confirmPassword"
                name="confirmPassword"
                type="text"
                state={
                  passwordResetConfirmFormik.touched.confirmPassword &&
                  passwordResetConfirmFormik.errors.confirmPassword
                    ? "error"
                    : "success"
                }
                onChange={passwordResetConfirmFormik.handleChange}
                onBlur={passwordResetConfirmFormik.handleBlur}
                value={passwordResetConfirmFormik.values.confirmPassword}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center  rounded-lg">
            <Button
              type="submit"
              label="Submit"
              extraClass="!w-full !bg-[#0095f6] !p-2"
            />
          </div>
          <div>
            <p className="text-xs text-red-600">
              {passwordResetConfirmFormik.touched.password &&
              passwordResetConfirmFormik.errors.password ? (
                <div>{passwordResetConfirmFormik.errors.password}</div>
              ) : null}
            </p>
            <p className="text-xs text-red-600">
              {passwordResetConfirmFormik.touched.confirmPassword &&
              passwordResetConfirmFormik.errors.confirmPassword ? (
                <div>{passwordResetConfirmFormik.errors.confirmPassword}</div>
              ) : null}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmResetPassword;

