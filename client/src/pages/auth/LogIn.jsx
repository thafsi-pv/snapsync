import { useFormik } from "formik";
import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useChat from "../../hooks/useChat";
import useLocalStorage from "../../hooks/useLocalStorage";
import AuthLayout from "../../layout/AuthLayout";
import { tokenName } from "../../utils/const";
import { logInValidationSchema } from "../../utils/validation";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { LOGIN_API } from "../../services/api/const";
import Logo from "../../components/uiPrimitives/logo/Logo";
import InputField from "../../components/uiPrimitives/fields/InputField";
import Button from "../../components/uiPrimitives/button";

function LogIn() {
  const { setStorage } = useLocalStorage();
  const {connectSocket } = useChat(); // Connect to the socket only on successful login;

  const navigate = useNavigate();
  const logInFormik = useFormik({
    initialValues: {
      emailPhone: "",
      password: "",
    },
    validationSchema: logInValidationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      handleLogIn(values);
    },
  });

  const handleLogIn = async (values) => {
    const result = await axiosInstance.post(LOGIN_API, values);

    if (result.status === 200) {
      //localStorage.setItem("ssaccestoken", result.data.accesstoken);
      setStorage(tokenName, result.data.accesstoken);
      navigate("/");
      connectSocket(result.data.accesstoken);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        <div className="relative flex flex-col w-[360px]">
          <div className="border-solid border-[#d7d7d7] relative flex flex-col justify-start  pb-5 shrink-0 px-10 border">
            <div className="flex flex-col gap-7">
              <div className="self-center flex flex-col w-56  items-center">
                <Logo />
              </div>
              <form
                onSubmit={logInFormik.handleSubmit}
                className="flex flex-col mr-3 gap-1">
                <div className="flex flex-col ml-3 gap-2">
                  <div className="flex flex-col gap-2">
                    <InputField
                      placeholder=" Phone number, Username, or Email"
                      id="emailPhone"
                      name="emailPhone"
                      type="text"
                      state={
                        logInFormik.touched.emailPhone &&
                        logInFormik.errors.emailPhone
                          ? "error"
                          : "success"
                      }
                      onChange={logInFormik.handleChange}
                      onBlur={logInFormik.handleBlur}
                      value={logInFormik.values.emailPhone}
                    />

                    <InputField
                      placeholder="Password"
                      id="password"
                      name="password"
                      type="text"
                      state={
                        logInFormik.touched.password &&
                        logInFormik.errors.password
                          ? "error"
                          : "success"
                      }
                      onChange={logInFormik.handleChange}
                      onBlur={logInFormik.handleBlur}
                      value={logInFormik.values.password}
                    />
                  </div>
                </div>

                <div className="flex flex-col ml-3 gap-3 items-start">
                  <Button
                    type="submit"
                    label="Log In"
                    extraClass="w-full mt-4"
                  />
                </div>
                <div>
                  <p className="text-xs text-red-600">
                    {logInFormik.touched.emailPhone &&
                    logInFormik.errors.emailPhone ? (
                      <div>{logInFormik.errors.emailPhone}</div>
                    ) : null}
                  </p>
                  <p className="text-xs text-red-600">
                    {logInFormik.touched.password &&
                    logInFormik.errors.password ? (
                      <div>{logInFormik.errors.password}</div>
                    ) : null}
                  </p>
                </div>
              </form>
            </div>
            <div className="flex flex-col  items-start mt-5">
              <div className="self-stretch flex flex-row gap-5 items-start">
                <div
                  id="Line"
                  className="border-solid border-[#dfdfdf] mt-3 w-2/5 h-px border-t border-b-0 border-x-0"
                />
                <div className="flex flex-row gap-5 w-1/2 items-start">
                  <div className="text-sm font-semibold tracking-[-0.63] text-[#606060]">
                    OR
                  </div>
                  <div
                    id="Line1"
                    className="border-solid border-[#dfdfdf] mt-3 w-32 h-px border-t border-b-0 border-x-0"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full  shrink-0 items-start">
                <div className="text-sm text-[#606060] w-full">
                  <img
                    src="https://file.rendit.io/n/HBpo3FNIqlYTAz2Oj4ax.svg"
                    className="self-start mt-1 w-5 shrink-0"
                  />
                  <div className="text-center text-sm font-semibold mb-1 flex justify-center items-center gap-2 text-[#385185]">
                    <AiFillFacebook className="w-5 h-5 text-[#385185]" />
                    Log in with Facebook
                  </div>
                </div>
                <div className="text-xs  self-center">
                  Forgotten your password?
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-solid border-[#d7d7d7] flex flex-row justify-center gap-px w-[360px] h-16 shrink-0 items-center border mt-3">
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
