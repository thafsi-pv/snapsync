const express = require("express");

const { checkAuth } = require("../middleware/checkAuth");
const { createPost, getAllPosts, getEntiryPost } = require("../controller/postController");

const postRouter = express.Router();

postRouter.post("/", checkAuth, createPost);
postRouter.get("/",checkAuth, getAllPosts);
postRouter.get("/entirePosts",checkAuth, getEntiryPost);

module.exports = postRouter;
