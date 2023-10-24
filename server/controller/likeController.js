const likeModel = require("../model/likeModel");

const likePost = async (req, res) => {
  try {
    const { liked, post_id } = req.body;
    console.log("🚀 ~ file: likeController.js:6 ~ likePost ~ liked:", liked)
    const user_id = req.userId;

    const existingLike = await likeModel.findOne({ user_id, post_id });
    console.log("🚀 ~ file: likeController.js:9 ~ likePost ~ existingLike:", existingLike)

    if (existingLike && !liked) {
      // Update the existing like's "liked" property
      const data = await likeModel.findByIdAndDelete(existingLike._id);
      return res.status(200).json({message:'dleeterd'});
    }

    // If no existing like is found, create a new like
    const newLike = await likeModel.create({ post_id, user_id, liked });
    return res.status(200).json(newLike);
  } catch (error) {
    console.error("Error in likePost:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { likePost };
