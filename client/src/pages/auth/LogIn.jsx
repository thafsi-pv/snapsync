import { useFormik } from "formik";
import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { Link } from "react-router-dom";
import OrLine from "../../components/uiPrimitives/OrLine";
import Logo from "../../components/uiPrimitives/logo/Logo";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import AuthLayout from "../../layout/AuthLayout";
import { logInValidationSchema } from "../../utils/validation";
import LogInForm from "./forms/LogInForm";

/* 
# Render the login page, including a formik login form ,social login option,
# Forgotten password link and link to sign-up page.
# Connects to a chat socket upon successful login
*/

function LogIn() {
  // const { setStorage } = useLocalStorage();
  const { handleLogIn } = useAuth();
  //  const { connectSocket } = useChat();

  const logInFormik = useFormik({
    initialValues: {
      emailPhone: "",
      password: "",
    },
    validationSchema: logInValidationSchema,
    onSubmit: (values) => {
      handleLogIn(values);
    },
  });

  // const handleLogIn = useCallback(async (values) => {

  //   const result = await axiosInstance.post(LOGIN_API, values);
  //   if (result.status === 200) {
  //     alert("success");
  //     setStorage(tokenName, result.data.accesstoken);
  //     navigate("/");
  //     // connectSocket(result.data.accesstoken); // Connect to the socket only on successful login
  //   } else {
  //     alert(result, "failed");
  //   }
  // }, []);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        <div className="relative flex flex-col w-[360px]">
          <div className="border-solid border-[#d7d7d7] relative flex flex-col justify-start  pb-5 shrink-0 px-10 lg:border ">
            <div className="flex flex-col gap-7">
              <div className="self-center flex flex-col w-56  items-center">
                <Logo />
              </div>
              <LogInForm logInFormik={logInFormik} />
            </div>
            <div className="flex flex-col  items-start mt-5">
              <OrLine />
              <div className="flex flex-col gap-2 w-full  shrink-0 items-center mt-4">
                <div className="text-center text-sm font-semibold mb-1 flex justify-center items-center gap-2 text-[#385185]">
                  <AiFillFacebook className="w-5 h-5 text-[#385185]" />
                  Log in with Facebook
                </div>
                <Link to="/accounts/password/reset">
                  <div className="text-xs  self-center">
                    Forgotten your password?
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-solid border-[#d7d7d7] flex flex-row justify-center gap-px w-[360px] h-16 shrink-0 items-center lg:border mt-3">
          <div className="text-sm  tracking-[-0.63]">
            Don’t have an account?
          </div>
          <Link to="/auth/signup">
            <div className="text-sm text-[#0095f6]">
              <strong>Sign up</strong>
            </div>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LogIn;
