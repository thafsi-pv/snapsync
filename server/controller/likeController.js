const likeModel = require("../model/likeModel");

const likeModal = requrie("");

const likePost = async (req, res) => {
  try {
    const { like, post_id } = req.body;
    const user_id = req.userId;

    const isExist = await likeModel.findOne({ user_id, post_id });

    if (isExist && like) {
      const update = await likeModal.findByIdAndDelete(isExist._id);
      res.status(200).json(update);
    }

    const newLike = await likeModal.create({ post_id, user_id });
    res.status(200).json(newLike);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { likePost };
