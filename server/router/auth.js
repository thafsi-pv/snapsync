const express = require("express");
const {
  signUp,
  signIn,
  isUserNameExist,
  emailVerification,
  rotateRefreshToken,
  resetPasswordEmail,
  resetPassword,
} = require("../controller/auth");
const { verifyEmail } = require("../middleware/verifyEmail");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.get("/isUserName-exist", isUserNameExist);
authRouter.post("/login", signIn);
authRouter.post("/verify-email", verifyEmail, emailVerification);
authRouter.get("/refresh-token", rotateRefreshToken);
authRouter.get("/reset-password-mail", resetPasswordEmail);
authRouter.get("/reset-password", verifyEmail, resetPassword);

module.exports = { authRouter };
