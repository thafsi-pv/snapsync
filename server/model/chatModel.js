const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    messageType: {
      type: String,
      enum: ["TextMessage", "PostMessage", "ProfileMessage"],
      required: true,
    },
    message: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "messageType",
      required: true,
    },
    isRead: { type: Boolean },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Chats", chatSchema);
