const express = require("express");
const {
  signUp,
  signIn,
  isUserNameExist,
  emailVerification,
  rotateRefreshToken,
  resetPassword,
} = require("../controller/auth");
const { verifyEmail } = require("../middleware/verifyEmail");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.get("/isUserName-exist", isUserNameExist);
authRouter.post("/login", signIn);
authRouter.post("/verify-email", verifyEmail, emailVerification);
authRouter.get("/refresh-token", rotateRefreshToken);
authRouter.get("/reset-password", resetPassword);

module.exports = { authRouter };
