const express = require("express");
const {
  getUserData,
  getSuggestionUsers,
} = require("../controller/userController");
const { checkAuth } = require("../middleware/checkAuth");

const userRouter = express.Router();

userRouter.get("/details", checkAuth, getUserData);
userRouter.get("/suggestion", checkAuth, getSuggestionUsers);

module.exports = userRouter;
