import React from "react";
import InputField from "../../components/fields/InputField";
import { useFormik } from "formik";
import { signUpValidationSchema } from "../../utils/validation";
import axiosInstance from "../../axios/axiosInterceptor";
import { ISUSERNAME_EXIST_API, LOGIN_API } from "../../axios/const";
import Logo from "../../components/logo/Logo";

function SignUp() {
  const signUpFormik = useFormik({
    initialValues: {
      emailPhone: "",
      fullName: "",
      userName: "",
      password: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values) => {
    const data = await axiosInstance.post(LOGIN_API, values);
    console.log("🚀 ~ file: SignUp.jsx:25 ~ handleSignUp ~ data:", data);
  };

  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value;
    signUpFormik.setFieldValue("userName", newUsername);

    if (newUsername) {
      const isExist = await checkUsernameAvailability(newUsername);
      console.log(
        "🚀 ~ file: SignUp.jsx:35 ~ handleUsernameChange ~ isExist:",
        isExist
      );
      if (!isExist) {
        signUpFormik.setFieldError("userName", "");
      } else {
        signUpFormik.setFieldError("userName", "Username is already taken");
      }
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axiosInstance.get(
        `${ISUSERNAME_EXIST_API}?username=${username}`
      );

      return response.data.exists;
    } catch (error) {
      console.error("Error checking username availability:", error);
      throw error;
    }
  };

  return (
    <div
      id="SignUpRoot"
      className="overflow-hidden bg-white flex flex-col justify-end pt-8 gap-16 w-full items-center">
      <div className="flex flex-col gap-3 items-center">
        <div className="self-start flex flex-col gap-3 w-[360px]">
          <div className="border-solid border-[#d7d7d7] flex flex-col gap-4 pt-6 pb-12 px-8 border">
            <div className="self-center flex flex-col   items-center">
              <Logo />
              <div className="w-full text-center text-base font-semibold text-gray-500">
                Sign up to see photos and videos from your friends.
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0 mx-3">
              <button className="bg-[#0095f6] flex flex-row gap-4 justify-center items-center pt-1 rounded-lg">
                <img
                  src="https://file.rendit.io/n/HBpo3FNIqlYTAz2Oj4ax.svg"
                  className="self-start mt-1 w-5 shrink-0"
                />
                <div className="text-center text-sm font-semibold tracking-[-0.81] leading-[27.6px] text-white mb-1">
                  Log in with Facebook
                </div>
              </button>
              <div className="flex flex-row gap-4 justify-center items-center">
                <div
                  id="Line1"
                  className="border-solid border-[#dfdfdf] w-2/5 h-px border-t border-b-0 border-x-0"
                />
                <span className="font-semibold text-gray-500 text-sm">OR</span>
                <div
                  id="Line"
                  className="border-solid border-[#dfdfdf] w-2/5 h-px border-t border-b-0 border-x-0"
                />
              </div>
            </div>
            <form
              onSubmit={signUpFormik.handleSubmit}
              className="flex flex-col mr-3 gap-1">
              <div className="flex flex-col ml-3 gap-2">
                <div className="flex flex-col gap-2">
                  <InputField
                    placeholder="Email / Phone Number"
                    id="emailPhone"
                    name="emailPhone"
                    type="text"
                    state={
                      signUpFormik.touched.emailPhone &&
                      signUpFormik.errors.emailPhone
                        ? "error"
                        : "success"
                    }
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.emailPhone}
                  />

                  <InputField
                    placeholder="Full Name"
                    id="fullName"
                    name="fullName"
                    type="text"
                    state={
                      signUpFormik.touched.fullName &&
                      signUpFormik.errors.fullName
                        ? "error"
                        : "success"
                    }
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.fullName}
                  />

                  <InputField
                    placeholder="Username"
                    id="userName"
                    name="userName"
                    type="text"
                    state={
                      signUpFormik.touched.userName &&
                      signUpFormik.errors.userName
                        ? "error"
                        : "success"
                    }
                    onChange={handleUsernameChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.userName}
                  />

                  <InputField
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="text"
                    state={
                      signUpFormik.touched.password &&
                      signUpFormik.errors.password
                        ? "error"
                        : "success"
                    }
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    value={signUpFormik.values.password}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2 mb-px  w-full items-center p-2">
                <div className="flex flex-col  items-center">
                  <div className="text-center text-xs  tracking-[-0.63] leading-3 text-[#6e6e6e]">
                    People who use our service may have uploaded your contact
                    information to snapsync.
                    <span className="text-[#005dae]">Learn More</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-3 gap-3 items-start">
                <div className="text-center text-xs tracking-[-0.63] leading-2 text-[#6e6e6e]">
                  By signing up, you agree to out
                  <span className="text-[#005dae]">Terms</span>,
                  <span className="text-[#005dae]">Privacy Policy </span>
                  and <span className="text-[#005dae]">Cookies</span>
                  <span className="text-[#005dae]">Policy</span>
                </div>
                <div className="bg-[#0095f6] self-stretch flex flex-col items-center  py-1 rounded-lg">
                  <button
                    type="submit"
                    className="text-center text-sm font-semibold  tracking-[-0.81]  text-white p-1">
                    Sign up
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-red-600">
                  {signUpFormik.touched.emailPhone &&
                  signUpFormik.errors.emailPhone ? (
                    <div>{signUpFormik.errors.emailPhone}</div>
                  ) : null}
                </p>
                <p className="text-xs text-red-600">
                  {signUpFormik.touched.fullName &&
                  signUpFormik.errors.fullName ? (
                    <div>{signUpFormik.errors.fullName}</div>
                  ) : null}
                </p>
                <p className="text-xs text-red-600">
                  {signUpFormik.touched.userName &&
                  signUpFormik.errors.userName ? (
                    <div>{signUpFormik.errors.userName}</div>
                  ) : null}
                </p>
                <p className="text-xs text-red-600">
                  {signUpFormik.touched.password &&
                  signUpFormik.errors.password ? (
                    <div>{signUpFormik.errors.password}</div>
                  ) : null}
                </p>
              </div>
            </form>
          </div>
          <div className="border-solid border-[#d7d7d7] flex flex-col justify-center h-20 shrink-0 items-center border">
            <div
              id="HaveAnAccountLogIn1"
              className="text-center text-base tracking-[-0.77] leading-[26.1px] text-[#6e6e6e]">
              Have an account? <span className="text-[#0095f6]">Log in</span>
            </div>
          </div>
        </div>
        <div className="text-center text-base font-['Microsoft_Sans_Serif'] tracking-[-0.77] leading-[26.1px] text-[#6e6e6e]">
          Get the app.
        </div>
      </div>
      <img src="" id="Image1" className="self-start mb-0" />
    </div>
  );
}

export default SignUp;
