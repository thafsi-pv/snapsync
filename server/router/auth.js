const express = require("express");
const {
  signUp,
  signIn,
  isUserNameExist,
  emailVerification,
} = require("../controller/auth");
const { verifyEmail } = require("../middleware/verifyEmail");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.get("/isUserNameExist", isUserNameExist);
authRouter.post("/login", signIn);
authRouter.post("/verifyEmail", verifyEmail, emailVerification);

module.exports = { authRouter };
