import React from "react";
import { Link } from "react-router-dom";
import PasswordReset from "../../assets/svg/PasswordReset";
import OrLine from "../../components/uiPrimitives/OrLine";
import Button from "../../components/uiPrimitives/button";
import InputField from "../../components/uiPrimitives/fields/InputField";
import Logo from "../../components/uiPrimitives/logo/Logo";
import AuthLayout from "../../layout/AuthLayout";
import { useFormik } from "formik";
import { passwordResetValidationSchema } from "../../utils/validation";
import { axiosInstance } from "../../services/api/axiosInterceptor";

function ResetPassword() {
  const passwordResetFormik = useFormik({
    initialValues: {
      emailUsername: "",
    },
    validationSchema: passwordResetValidationSchema,
    onSubmit: (values) => {
      //handleLogIn(values);
      alert(values)
    },
  });

  const handlePasswordReset = async () => {
    const response = await axiosInstance.post();
  };

  return (
    <AuthLayout>
      <div className="relative w-screen overflow-hidden bg-white flex flex-col gap-12 items-center mx-h-screen">
        <div className="w-full fixed top-0 px-10 py-2 border-b bg-white z-10">
          {/* <img src={logo} id="Logo" className="w-32 " /> */}
          <Logo extra="!m-0 !w-32" />
        </div>

        <div className=" relative mt-28 border-solid border-[#d7d7d7] flex flex-col gap-1  shrink-0 items-center  border lg:w-1/4 md:w-1/3 sm-w-full p-10">
          <div className="flex flex-col  items-center text-center">
            <div className="w-24 h-24">
              <PasswordReset />
            </div>
            <p className="text-base font-bold pb-3">
              {" "}
              Trouble with logging in?
            </p>
            <p className="text-xs">
              Enter your email address, phone number or username, and we'll send
              you a link to get back into your account.
            </p>
          </div>
          <form
            onSubmit={passwordResetFormik.handleSubmit}
            className="flex flex-col gap-8 w-full m-12 mt-2">
            <div className="flex flex-col gap-4 w-full items-center">
              <div className=" w-full flex flex-col justify-center ">
                <InputField
                  placeholder="Email address or username"
                  extra="w-full rounded"
                  id="emailUsername"
                  name="emailUsername"
                  type="text"
                  state={
                    passwordResetFormik.touched.emailUsername &&
                    passwordResetFormik.errors.emailUsername
                      ? "error"
                      : "success"
                  }
                  onChange={passwordResetFormik.handleChange}
                  onBlur={passwordResetFormik.handleBlur}
                  value={passwordResetFormik.values.emailUsername}
                />
              </div>
              <div>
                <a className="text-xs text-blue-900" href="#">
                  Can't reset your password?
                </a>
              </div>
              <div className="w-full ">
                <OrLine />
              </div>
              <div>
                <Link to="/auth/signup">
                  <a className="text-sm font-semibold" href="#">
                    Create new account
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-full flex flex-col items-center  rounded-lg">
              <Button
                type="submit"
                label="submit"
                extraClass="!w-full !bg-[#0095f6] !p-2"
              />
            </div>
          </form>
          <div className="w-full bg-gray-100 absolute bottom-0 h-10 flex items-center justify-center">
            <Link to="/auth/login">
              <p>Back to login</p>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ResetPassword;
