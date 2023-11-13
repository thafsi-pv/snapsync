import React from "react";
import InputField from "../../../components/uiPrimitives/fields/InputField";

/**
 * SignUpForm Component:
 * Renders a signup form using Formik, including error messages.
 * @param {Object} signUpFormik - Formik properties passed as a prop.
 */

function SignUpForm({ signUpFormik }) {
  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value;
    signUpFormik.setFieldValue("userName", newUsername);

    if (newUsername) {
      const isExist = await checkUsernameAvailability(newUsername);

      if (!isExist) {
        signUpFormik.setFieldError("userName", "");
      } else {
        signUpFormik.setFieldError("userName", "Username is already taken");
      }
    }
  };
  return (
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
              signUpFormik.touched.emailPhone && signUpFormik.errors.emailPhone
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
              signUpFormik.touched.fullName && signUpFormik.errors.fullName
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
              signUpFormik.touched.userName && signUpFormik.errors.userName
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
              signUpFormik.touched.password && signUpFormik.errors.password
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
        {rights}
      </div>
      <div className="flex flex-col ml-3 gap-3 items-start">
        {tandc}
        <div className="bg-[#0095f6] self-stretch flex flex-col items-center  py-1 rounded-lg">
          <button
            type="submit"
            className="text-center text-sm font-semibold  tracking-[-0.81]  text-white p-1">
            Sign up
          </button>
        </div>
      </div>
      <div className="text-center mx-auto w-full mt-4">
        <p className="text-xs text-red-600 ">
          {signUpFormik.touched.emailPhone && signUpFormik.errors.emailPhone ? (
            <div>{signUpFormik.errors.emailPhone}</div>
          ) : null}
        </p>
        <p className="text-xs text-red-600 ">
          {signUpFormik.touched.fullName && signUpFormik.errors.fullName ? (
            <div>{signUpFormik.errors.fullName}</div>
          ) : null}
        </p>
        <p className="text-xs text-red-600">
          {signUpFormik.touched.userName && signUpFormik.errors.userName ? (
            <div>{signUpFormik.errors.userName}</div>
          ) : null}
        </p>
        <p className="text-xs text-red-600">
          {signUpFormik.touched.password && signUpFormik.errors.password ? (
            <div>{signUpFormik.errors.password}</div>
          ) : null}
        </p>
      </div>
    </form>
  );
}

export default SignUpForm;

const tandc = (
  <div className="text-center text-xs tracking-[-0.63] leading-2 text-[#6e6e6e]">
    By signing up, you agree to out
    <span className="text-[#005dae]">Terms</span>,
    <span className="text-[#005dae]">Privacy Policy </span>
    and <span className="text-[#005dae]">Cookies</span>
    <span className="text-[#005dae]">Policy</span>
  </div>
);

const rights = (
  <div className="flex flex-col  items-center">
    <div className="text-center text-xs  tracking-[-0.63] leading-3 text-[#6e6e6e]">
      People who use our service may have uploaded your contact information to
      snapsync.
      <span className="text-[#005dae]">Learn More</span>
    </div>
  </div>
);
