const express = require("express");
const { commentPost } = require("../controller/commentController");
const { checkAuth } = require("../middleware/checkAuth");

const commentRouter = express.Router();

commentRouter.post("/", checkAuth, commentPost);

module.exports = commentRouter;
