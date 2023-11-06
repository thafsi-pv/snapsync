const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mediaUrl: { type: String },
    media_type: { type: String },
    expireAt: { type: Date },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Story", storySchema);
