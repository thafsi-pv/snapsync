const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
    isRead: { type: Boolean },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Chats", chatSchema);
