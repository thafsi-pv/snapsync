const mongoose = require("mongoose");

const followsSchema = mongoose.Schema(
  {
    following_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followed_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followStatus: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Follows", followsSchema);
