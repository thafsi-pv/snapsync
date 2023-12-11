const express = require("express");
const {
  signUp,
  signIn,
  isUserNameExist,
  emailVerification,
  rotateRefreshToken,
  resetPasswordEmail,
  resetPassword,
  resendEmailActivationMail,
} = require("../controller/auth");
const { verifyEmail } = require("../middleware/verifyEmail");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.get("/isUserName-exist", isUserNameExist);
authRouter.post("/login", signIn);
authRouter.post("/verify-email", verifyEmail, emailVerification);
authRouter.get("/refresh-token", rotateRefreshToken);
authRouter.get("/reset-password-mail", resetPasswordEmail);
authRouter.post("/reset-password", verifyEmail, resetPassword);
authRouter.get("/resend-email-verification", resendEmailActivationMail);

module.exports = { authRouter };
