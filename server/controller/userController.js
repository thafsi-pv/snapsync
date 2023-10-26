const followsModel = require("../model/followsModel");
const userModal = require("../model/userModel");

const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = await userModal.findOne({ _id: userId });
    if (!userDetails)
      return res.status(404).json({ message: "User not found!" });
    return res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getSuggestionUsers = async (req, res) => {
  try {
    const userId = req.userId;

    const followingUsers = await followsModel
      .find({
        following_user_id: userId,
        followStatus: true,
      })
      .select("followed_user_id");

    const followingUserIds = followingUsers.map(
      (follow) => follow.followed_user_id
    );

    const suggestionList = await userModal
      .find({ _id: { $nin: [userId, ...followingUserIds] } })
      .limit(7);

    res.status(200).json(suggestionList);
  } catch (error) {
    console.log(
      "🚀 ~ file: userController.js:40 ~ getSuggestionUsers ~ error:",
      error
    );
    res.status(500).json(error);
  }
};

module.exports = { getUserData, getSuggestionUsers };
