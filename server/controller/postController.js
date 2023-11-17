const { default: mongoose } = require("mongoose");
const postModal = require("../model/postModel");
const followsModel = require("../model/followsModel");
const savedPostModel = require("../model/savedPostModel");

const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const { media_url, caption, location, media_type } = req.body;
    if (!userId) return res.status(404).json({ message: "User not found!" });

    const post = { user_id: userId, media_url, caption, location, media_type };
    const newPost = await postModal.create(post);

    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const user_id = req.userId;
    const followingUsers = await followsModel
      .find({
        following_user_id: user_id,
        followStatus: true,
      })
      .select("followed_user_id");

    const followingUserIds = followingUsers.map(
      (follow) => follow.followed_user_id
    );
    const objUserId = new mongoose.Types.ObjectId(user_id);
    const postsWithLikes = await postModal.aggregate([
      {
        $match: {
          user_id: { $in: [objUserId, ...followingUserIds] },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post_id",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post_id",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "savedposts",
          localField: "_id",
          foreignField: "post_id",
          as: "savedposts",
        },
      },
      {
        $project: {
          "user.emailPhone": 1,
          "user.fullName": 1,
          "user.imageUrl": 1,
          "user.userName": 1,
          "user._id": 1,
          media_url: 1,
          media_type: 1,
          caption: 1,
          location: 1,
          createdAt: 1,
          likeCount: { $size: "$likes" },
          commentCount: { $size: "$comments" },
          liked: {
            $in: [
              new mongoose.Types.ObjectId(user_id), // Convert user_id to ObjectId
              { $map: { input: "$likes", as: "like", in: "$$like.user_id" } },
            ],
          },
          saved: {
            $in: [
              new mongoose.Types.ObjectId(user_id), // Convert user_id to ObjectId
              {
                $map: {
                  input: "$savedposts",
                  as: "savedposts",
                  in: "$$savedposts.user_id",
                },
              },
            ],
          },
        },
      },
    ]);
    if (!postsWithLikes)
      return res.status(404).json({ message: "No post found!" });
    console.log(
      "🚀 ~ file: postController.js:109 ~ getAllPosts ~ postsWithLikes:",
      postsWithLikes
    );
    return res.status(200).json(postsWithLikes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getEntiryPost = async (req, res) => {
  try {
    const entirePost = await postModal.find({});
    console.log(
      "🚀 ~ file: postController.js:101 ~ getEntiryPost ~ entirePost:",
      entirePost
    );
    res.status(200).json(entirePost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const savePost = async (req, res) => {
  const userId = req.userId;
  const { post_id } = req.body;
  console.log(
    "🚀 ~ file: postController.js:117 ~ savePost ~ post_id:",
    post_id
  );
  try {
    const existingSavePost = await savedPostModel.findOne({
      user_id: userId,
      post_id: post_id,
    });

    if (existingSavePost) {
      await savedPostModel.deleteOne({
        user_id: userId,
        post_id: post_id,
      });
      res.status(200).json({ message: "Post removed from saved posts" });
    } else {
      const savePostInstance = new savedPostModel({ user_id: userId, post_id });
      const savedPost = await savePostInstance.save();
      res.status(201).json({ message: "Post saved successfully", savedPost });
    }
  } catch (error) {
    console.error("Error saving/removing post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createPost, getAllPosts, getEntiryPost, savePost };
