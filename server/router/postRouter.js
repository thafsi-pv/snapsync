const express = require("express");

const { checkAuth } = require("../middleware/checkAuth");
const { createPost, getAllPosts } = require("../controller/postController");

const postRouter = express.Router();

postRouter.post("/", checkAuth, createPost);
postRouter.get("/",checkAuth, getAllPosts);

module.exports = postRouter;
