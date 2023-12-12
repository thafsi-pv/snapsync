exports.checkPostIsOwn = async (req, res, next) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    // Check if the post exists
    const existingPost = await postModal.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Check if the post belongs to the logged-in user
    if (existingPost.user_id.toString() !== userId) {
      return res
        .status(403)
        .json({
          message: "Unauthorized - Post does not belong to the logged-in user",
        });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "You are UnAutorized" });
  }
};
