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
  const { username, type } = req.query;
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
        bio: 1,
        followingCount: { $size: "$followingUsers" },
        followedCount: { $size: "$followedUsers" },
      },
    },
  ]);

  if (profile.length > 0) {
    const userProfile = profile[0];
    // const matchStage =
    //   type == 1
    //     ? { "files.fileType": /^video/ }
    //     : type == 2
    //     ? { "files.fileType": /^image/ }
    //     : {};

    const matchStage = {};

    if (type == 1) {
      matchStage["$expr"] = {
        $and: [
          { $eq: [{ $size: "$files" }, 1] },
          {
            $eq: [
              {
                $size: {
                  $filter: {
                    input: "$files",
                    as: "file",
                    cond: {
                      $regexMatch: {
                        input: "$$file.fileType",
                        regex: /^video/,
                      },
                    },
                  },
                },
              },
              1,
            ],
          },
        ],
      };
    } else if (type == 2) {
      matchStage["$expr"] = {
        $and: [
          { $eq: [{ $size: "$files" }, 1] },
          {
            $eq: [
              {
                $size: {
                  $filter: {
                    input: "$files",
                    as: "file",
                    cond: {
                      $regexMatch: {
                        input: "$$file.fileType",
                        regex: /^image/,
                      },
                    },
                  },
                },
              },
              1,
            ],
          },
        ],
      };
    }
    const posts = await postModal.aggregate([
      {
        $match: { user_id: userProfile._id, ...matchStage },
      },
      {
        $project: {
          files: 1,
          caption: 1,
          location: 1,
          createdAt: 1,
        },
      },
    ]);
    profile.posts = posts;
    console.log(
      "🚀 ~ file: userController.js:119 ~ getProfileData ~ profile:",
      profile
    );
    res.status(200).json({ profile: profile, post: posts });
  } else {
    // Handle the case where no user with the specified username is found.
  }
};

const searchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.param;
    const users = await userModal
      .find({
        $or: [
          { userName: { $regex: searchTerm, $options: "i" } },
          { fullName: { $regex: searchTerm, $options: "i" } },
        ],
      })
      .select("-password -isVerified");
    res.status(200).json(users);
  } catch (error) {
    console.log(
      "🚀 ~ file: userController.js:129 ~ searchUsers ~ error:",
      error
    );
  }
};

const updateProfile = async (req, res) => {
  try {
    const _id = req.userId;
    const { bio, imageUrl } = req.body;
    if (typeof bio !== "string" || typeof imageUrl !== "string") {
      return res.status(400).json({ error: "Invalid input data" });
    }
    const updated = await userModal.findByIdAndUpdate(_id, { bio, imageUrl });
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUserData,
  getSuggestionUsers,
  getProfileData,
  searchUsers,
  updateProfile,
};
