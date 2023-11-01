const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Chats", chatSchema);