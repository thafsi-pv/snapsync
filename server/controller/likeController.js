const likeModel = require("../model/likeModel");

const likePost = async (req, res) => {
  try {
    const { liked, post_id } = req.body;
    const user_id = req.userId;

    const isExist = await likeModel.findOne({ user_id, post_id });

    if (isExist && like) {
      const update = await likeModel.findByIdAndUpdate(isExist._id, {
        liked,
      });
      res.status(200).json(update);
    }

    const newLike = await likeModel.create({ post_id, user_id, liked });
    res.status(200).json(newLike);
  } catch (error) {
    console.error("Error in likePost:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { likePost };
