const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true },
});

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    files: [fileSchema],
    caption: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

// const postSchema = new mongoose.Schema(
//   {
//     user_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     media_url: {
//       type: String,
//     },
//     media_type: {
//       type: String,
//     },
//     caption: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
