const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: String,// 'follow', 'like', 'comment'
    sender_Id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient_Id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
