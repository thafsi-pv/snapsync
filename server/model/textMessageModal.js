const mongoose = require("mongoose");

const textMessageSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TextMessage", textMessageSchema);
