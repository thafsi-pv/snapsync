const express = require("express");
const { getUserData } = require("../controller/userController");
const { checkAuth } = require("../middleware/checkAuth");

const userRouter = express.Router();

userRouter.get("/details", checkAuth, getUserData);

module.exports = userRouter;
