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

    // Find the users that the userId is following
    const followingUsers = await followsModel
      .find({
        following_user_id: userId,
        followStatus: true,
      })
      .select("followed_user_id");

    const followingUserIds = followingUsers.map(
      (follow) => follow.followed_user_id
    );

    // Find suggestionList excluding users that userId is following
    const suggestionList = await userModal
      .find({ _id: { $nin: [userId, ...followingUserIds] } })
      .limit(7);
    console.log("🚀 ~ file: userController.js:36 ~ getSuggestionUsers ~ suggestionList:", suggestionList)

    res.status(200).json(suggestionList);
  } catch (error) {
    console.log("🚀 ~ file: userController.js:40 ~ getSuggestionUsers ~ error:", error)
    res.status(500).json(error);
  }
};

module.exports = { getUserData, getSuggestionUsers };
