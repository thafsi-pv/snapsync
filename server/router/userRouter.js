const express = require("express");
const {
  getUserData,
  getSuggestionUsers,
  getProfileData,
} = require("../controller/userController");
const { checkAuth } = require("../middleware/checkAuth");
const { followUser } = require("../controller/followsController");

const userRouter = express.Router();

userRouter.get("/details", checkAuth, getUserData);
userRouter.get("/suggestion", checkAuth, getSuggestionUsers);
userRouter.post("/follow", checkAuth, followUser);
userRouter.get("/profile", getProfileData);

module.exports = userRouter;
