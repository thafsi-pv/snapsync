const express = require("express");
const {
  getUserData,
  getSuggestionUsers,
  getProfileData,
  searchUsers,
  updateProfile,
} = require("../controller/userController");
const { checkAuth } = require("../middleware/checkAuth");
const {
  followUser,
  getFollowersList,
  removeFollowedUser,
} = require("../controller/followsController");
const {
  getUserDetailsWithUserName,
} = require("../middleware/getUserDetailsWithUserName");

const userRouter = express.Router();

userRouter.get("/details", checkAuth, getUserData);
userRouter.get("/suggestion", checkAuth, getSuggestionUsers);
userRouter.post("/follow", checkAuth, followUser);
userRouter.get("/profile", getProfileData);
userRouter.get("/searchUsers", searchUsers);
userRouter.put("/profile", checkAuth, updateProfile);
userRouter.delete("/follow", checkAuth, removeFollowedUser);
userRouter.get(
  "/follower-users",
  checkAuth,
  getUserDetailsWithUserName,
  getFollowersList
);

module.exports = userRouter;
