const express = require("express");

const { checkAuth } = require("../middleware/checkAuth");
const { createPost } = require("../controller/postController");

const postRouter = express.Router();

postRouter.post("/", checkAuth, createPost);

module.exports = postRouter;
