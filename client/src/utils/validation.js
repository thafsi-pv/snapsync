import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  emailPhone: Yup.string()
    .test("emailOrPhone", "Invalid email or phone", (value) => {
      if (!value) return false;
      // Check if it's a valid email
      if (Yup.string().email().isValidSync(value)) return true;
      // Check if it's a valid 10-digit phone number
      if (/^\d{10}$/.test(value)) return true;
      return false;
    })
    .required("Email or Phone Required"),
  fullName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Full Name Required"),
  userName: Yup.string()
    .matches(/^[a-zA-Z0-9.-]+$/, "Invalid characters, Use only . and -")
    .required("User Name Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/,
      "Invalid password format. Your password must include at least one capital letter, one digit, and one special symbol and minimum 8 character."
    )
    .required("Password Required"),
});

export const logInValidationSchema = Yup.object({
  emailPhone: Yup.string().test(
    "emailOrPhone",
    "Invalid email or phone",
    (value) => {
      if (!value) return false;
      // Check if it's a valid email
      if (Yup.string().email().isValidSync(value)) return true;
      // Check if it's a valid 10-digit phone number
      if (/^\d{10}$/.test(value)) return true;
      return false;
    }
  ),
  password: Yup.string().required("Password is Required"),
});
