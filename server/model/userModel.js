const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    emailPhone: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    password: { type: String },
    imageUrl: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
