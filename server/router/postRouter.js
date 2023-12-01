const express = require("express");

const { checkAuth } = require("../middleware/checkAuth");
const {
  createPost,
  getAllPosts,
  getEntiryPost,
  savePost,
  getSavedPosts,
  getReels,
} = require("../controller/postController");

const postRouter = express.Router();

postRouter.post("/", checkAuth, createPost);
postRouter.get("/", checkAuth, getAllPosts);
postRouter.get("/entirePosts", checkAuth, getEntiryPost);
postRouter.post("/save-post", checkAuth, savePost);
postRouter.get("/saved-post", checkAuth, getSavedPosts);
postRouter.get("/reels", getReels);

module.exports = postRouter;
