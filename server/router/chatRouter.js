const express = require("express");
const {
  createChat,
  getChats,
  getRecentChats,
} = require("../controller/chatController");
const { checkAuth } = require("../middleware/checkAuth");

const chatRouter = express.Router();

chatRouter.post("/create", createChat);
chatRouter.post("/getChats", getChats);
chatRouter.get("/getRecentChats", checkAuth, getRecentChats);

module.exports = chatRouter;
