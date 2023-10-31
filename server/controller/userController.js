const followsModel = require("../model/followsModel");
const userModal = require("../model/userModel");
const postModal = require("../model/postModel");

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

const getProfileData = async (req, res) => {
  const username = req.query.username;
  const profile = await userModal.aggregate([
    {
      $match: { userName: { $eq: username } },
    },
    {
      $lookup: {
        from: "follows",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$following_user_id", "$$userId"] },
              followStatus: true,
            },
          },
        ],
        as: "followingUsers",
      },
    },
    {
      $lookup: {
        from: "follows",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$followed_user_id", "$$userId"] },
              followStatus: true,
            },
          },
        ],
        as: "followedUsers",
      },
    },
    {
      $project: {
        emailPhone: 1,
        fullName: 1,
        userName: 1,
        imageUrl: 1,
        followingCount: { $size: "$followingUsers" },
        followedCount: { $size: "$followedUsers" },
      },
    },
  ]);

  if (profile.length > 0) {
    const userProfile = profile[0];
    const posts = await postModal.aggregate([
      {
        $match: { user_id: userProfile._id },
      },
      {
        $project: {
          media_url: 1,
          media_type: 1,
          caption: 1,
          location: 1,
          createdAt: 1,
        },
      },
    ]);

    profile.posts = posts;
    res.status(200).json({ profile: profile, post: posts });
  } else {
    // Handle the case where no user with the specified username is found.
  }
};

const searchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.param;
    console.log("🚀 ~ file: userController.js:122 ~ searchUsers ~ searchTerm:", searchTerm)
    const users = await userModal.find({
      $or: [
        { userName: { $regex: searchTerm, $options: "i" } },
        { fullName: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(
      "🚀 ~ file: userController.js:129 ~ searchUsers ~ error:",
      error
    );
  }
};

module.exports = {
  getUserData,
  getSuggestionUsers,
  getProfileData,
  searchUsers,
};
