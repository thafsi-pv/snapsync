const express = require("express");
const { signUp, signIn, isUserNameExist } = require("../controller/auth");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.get("/isUserNameExist", isUserNameExist);
authRouter.post("/logIn", signIn);

module.exports = { authRouter };
