import React from "react";
import InputField from "../../../components/uiPrimitives/fields/InputField";
import Button from "../../../components/uiPrimitives/button"


// Login form with formik prop and  shows error 

function LogInForm({ logInFormik }) {
  return (
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
              logInFormik.touched.emailPhone && logInFormik.errors.emailPhone
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
              logInFormik.touched.password && logInFormik.errors.password
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
        <Button type="submit" label="Log In" extraClass="w-full mt-4 !p-2" />
      </div>
      <div>
        <p className="text-xs text-red-600">
          {logInFormik.touched.emailPhone && logInFormik.errors.emailPhone ? (
            <div>{logInFormik.errors.emailPhone}</div>
          ) : null}
        </p>
        <p className="text-xs text-red-600">
          {logInFormik.touched.password && logInFormik.errors.password ? (
            <div>{logInFormik.errors.password}</div>
          ) : null}
        </p>
      </div>
    </form>
  );
}

export default LogInForm;
