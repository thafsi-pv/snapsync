const express = require("express");
const {
  commentPost,
  getCommentsByPostId,
} = require("../controller/commentController");
const { checkAuth } = require("../middleware/checkAuth");

const commentRouter = express.Router();

commentRouter.post("/", checkAuth, commentPost);
commentRouter.get("/", checkAuth, getCommentsByPostId);

module.exports = commentRouter;
