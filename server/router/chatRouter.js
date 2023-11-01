const express = require("express");
const { createChat, getChats } = require("../controller/chatController");

const chatRouter = express.Router();

chatRouter.post("/create", createChat);
chatRouter.post("/getChats", getChats);

module.exports = chatRouter;
