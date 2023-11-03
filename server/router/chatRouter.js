const express = require("express");
const {
  createChat,
  getChats,
  getRecentChats,
  readAllMessage,
} = require("../controller/chatController");
const { checkAuth } = require("../middleware/checkAuth");

const chatRouter = express.Router();

chatRouter.post("/create", createChat);
chatRouter.post("/getChats", getChats);
chatRouter.get("/getRecentChats", checkAuth, getRecentChats);
chatRouter.get("/readAllMessages", checkAuth, readAllMessage);

module.exports = chatRouter;
