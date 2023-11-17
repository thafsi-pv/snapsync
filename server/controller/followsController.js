const followsModel = require("../model/followsModel");
const { default: mongoose, mongo } = require("mongoose");

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

const getFollowersList = async (req, res) => {
  try {
    const userDetails = req.userDetails;
    console.log(
      "🚀 ~ file: followsController.js:35 ~ getFollowersList ~ userDetails:",
      userDetails
    );
    const listType = req.query.type;
    let matchStage = {};
    if (listType == "following") {
      matchStage = { following_user_id: { $eq: userDetails._id } };
    } else if (listType == "followed") {
      matchStage = { followed_user_id: { $eq: userDetails._id } };
    } else {
      throw new Error("Invalid listType parameter");
    }
    const result = await followsModel.aggregate([
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: "users",
          localField:
            listType === "following" ? "followed_user_id" : "following_user_id",
          foreignField: "_id",
          as: "followedUserInfo",
        },
      },
      { $unwind: "$followedUserInfo" },
      {
        $project: {
          "followedUserInfo.fullName": 1,
          "followedUserInfo._id": 1,
          "followedUserInfo.userName": 1,
          "followedUserInfo.imageUrl": 1,
          _id: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getFollowList:", error);
    throw error;
  }
};

module.exports = { followUser, getFollowersList };
