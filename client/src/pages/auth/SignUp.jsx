import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/uiPrimitives/fields/InputField";
import AuthLayout from "../../layout/AuthLayout";
import { SIGNUP_API } from "../../services/api/const";
import { signUpValidationSchema } from "../../utils/validation";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import Logo from "../../components/uiPrimitives/logo/Logo";
import SignUpForm from "./forms/SignUpForm";
import OrLine from "../../components/uiPrimitives/OrLine";



/**
 * SignUpPage Component:
 * Renders the signup page containing a signup form using Formik.
 * after register redirect to login 
 */

function SignUp() {
  const navigate = useNavigate();
  const signUpFormik = useFormik({
    initialValues: {
      emailPhone: "",
      fullName: "",
      userName: "",
      password: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values) => {
    const response = await axiosInstance.post(SIGNUP_API, values);
    if (response.status == 200) {
      navigate("/auth/login");
    }
  };

  return (
    <AuthLayout>
      <div className="self-start flex flex-col gap-3 w-[360px]">
        <div className="border-solid border-[#d7d7d7] flex flex-col gap-4 pt-6 pb-12 px-8 lg:border">
          <div className="self-center flex flex-col w-56 pb- items-center">
            <Logo />
            <div className="w-full text-center text-sm font-semibold text-gray-500">
              Sign up to see photos and videos from your friends.
            </div>
          </div>
          <div className="flex flex-col gap-4 shrink-0 mx-3">
            <button className="bg-[#0095f6] flex flex-row gap-4 justify-center items-center pt-1 rounded-lg">
              <img
                src="https://file.rendit.io/n/HBpo3FNIqlYTAz2Oj4ax.svg"
                className="self-start mt-1 w-5 shrink-0"
              />
              <div className="text-center text-sm font-semibold tracking-[-0.81] leading-[27.6px] text-white mb-1">
                Log in with Facebook
              </div>
            </button>
            <OrLine />
          </div>
          <SignUpForm signUpFormik={signUpFormik} />
        </div>
        <div className="border-solid border-[#d7d7d7] flex flex-col justify-center h-16 shrink-0 items-center lg:border">
          <div
            id="HaveAnAccountLogIn1"
            className="text-center text-sm text-[#6e6e6e] gap-1 flex">
            Have an account?
            <Link to="/auth/login">
              <span className="text-[#0095f6]">
                <strong>Log in</strong>{" "}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
