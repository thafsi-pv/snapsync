const mongoose = require("mongoose");
const followsModel = require("../model/followsModel");
const storyModel = require("../model/storyModel");

const createStory = async (req, res) => {
  try {
    const { mediaUrl, media_type } = req.body;
    const user_id = req.userId;
    console.log(
      "🚀 ~ file: storyController.js:6 ~ createStory ~ req.body:",
      req.body
    );
    const expireAt = new Date();
    expireAt.setHours(expireAt.getHours() + 24);
    const newStory = new storyModel({
      user_id,
      mediaUrl,
      media_type,
      expireAt,
    });
    const createdStory = await newStory.save();
    res.status(201).json(createdStory);
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ error: "Unable to create a story" });
  }
};

const getStoriesOfFollowers = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const storiesOfFollowers = await followsModel.aggregate([
      {
        $match: {
          following_user_id: userId,
          followStatus: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followed_user_id",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $unwind: "$followers",
      },
      {
        $lookup: {
          from: "stories",
          localField: "followers._id",
          foreignField: "user_id",
          as: "stories",
        },
      },
      {
        $unwind: {
          path: "$stories",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "stories.expireAt": { $gte: new Date() },
        },
      },
      {
        $sort: { "stories.createdAt": -1 },
      },
      {
        $group: {
          _id: "$followers._id",
          user_id: { $first: "$followers._id" },
          userName: { $first: "$followers.userName" },
          fullName: { $first: "$followers.fullName" },
          imageUrl: { $first: "$followers.imageUrl" },
          stories: { $push: "$stories" },
        },
      },
    ]);

    res.status(200).json(storiesOfFollowers);
  } catch (error) {
    console.error("Error:", error);
    // throw error;
    res.status(500).json({ error: "Unable to create a story" });
  }
};

const checkUserHavingStory = async (req, res) => {
  try {
    const userId = req.query.userId;

    // Check if userId is provided
    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is required in the query parameters." });
    }

    console.log(
      "🚀 ~ file: storyController.js:95 ~ checkUserHavingStory ~ userId:",
      userId
    );

    const data = await storyModel.find({
      user_id: userId,
      expireAt: { $gte: new Date() },
    });

    console.log(
      "🚀 ~ file: storyController.js:100 ~ checkUserHavingStory ~ data:",
      data
    );

    res.status(200).json(data);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in checkUserHavingStory:", error);

    res.status(500).json({ error: "Error in find operation." });
  }
};

module.exports = { createStory, getStoriesOfFollowers, checkUserHavingStory };
