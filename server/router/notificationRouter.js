const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const {
  saveNotification,
  getNotification,
} = require("../controller/notificationController");

const NotificationRouter = express.Router();
NotificationRouter.post("/", checkAuth, saveNotification);
NotificationRouter.get("/", checkAuth, getNotification);

module.exports = NotificationRouter;
