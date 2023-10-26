const followsModel = require("../model/followsModel");

const followUser = async (req, res) => {
  try {
    const { followStatus, followed_user_id } = req.body;
    const following_user_id = req.userId;

    const alreadyFollowed = await followsModel.findOne({
      following_user_id,
      followed_user_id,
    });

    if (alreadyFollowed && !followStatus) {
      const data = await followsModel.findByIdAndDelete(alreadyFollowed._id);
      return res.status(200).json({ message: "unfollow" });
    }

    const newFollow = await followsModel.create({
      followed_user_id,
      following_user_id,
      followStatus,
    });
    return res.status(200).json(newFollow);
  } catch (error) {
    console.error("Error in likePost:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { followUser };
