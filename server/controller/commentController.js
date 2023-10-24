const commentModel = require("../model/commentModel");

const commentPost = async (req, res) => {
  try {
    const { comment, post_id } = req.body;
    console.log("🚀 ~ file: commentController.js:6 ~ commentPost ~ req.body:", req.body)
    const user_id = req.userId;
    const newcomment = await commentModel.create({
      post_id,
      user_id,
      comment,
    });
    return res.status(200).json(newcomment);
  } catch (error) {
    console.error("Error in commentPost:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { commentPost };
