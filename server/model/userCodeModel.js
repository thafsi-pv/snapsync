const mongoose = require("mongoose");

const codeSchema = mongoose.Schema(
  {
    user_id: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserCode", codeSchema);
