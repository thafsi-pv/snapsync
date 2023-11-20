const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { saveNotification } = require("../controller/notificationController");

const NotificationRouter = express.Router();
NotificationRouter.post("/", checkAuth, saveNotification);

module.exports = NotificationRouter;
