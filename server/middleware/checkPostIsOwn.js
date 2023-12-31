const postModel = require("../model/postModel");

exports.checkPostIsOwn = async (req, res, next) => {
  try {
    const userId = req.userId;
    const postId = req.query.postId;
    console.log(
      "🚀 ~ file: checkPostIsOwn.js:7 ~ exports.checkPostIsOwn= ~ postId:",
      postId
    );
    // Check if the post exists
    const existingPost = await postModel.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Check if the post belongs to the logged-in user
    if (existingPost.user_id.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized - Post does not belong to the logged-in user",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "You are UnAutorized" });
  }
};
