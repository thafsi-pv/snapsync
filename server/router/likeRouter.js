const express = require("express");
const { likePost } = require("../controller/likeController");
const { checkAuth } = require("../middleware/checkAuth");

const likeRouter = express.Router();

likeRouter.post("/", checkAuth, likePost);

module.exports = likeRouter;
