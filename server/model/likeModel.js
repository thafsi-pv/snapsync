const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    liked: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Likes", likeSchema);
