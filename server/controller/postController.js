const { default: mongoose } = require("mongoose");
const postModal = require("../model/postModel");

const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(
      "🚀 ~ file: postController.js:6 ~ createPost ~ userId:",
      userId
    );
    const { media_url, caption, location, media_type } = req.body;
    console.log(
      "🚀 ~ file: postController.js:7 ~ createPost ~ req.body:",
      req.body
    );
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
    // const postDetails = await postModal.find().populate("user_id");
    // console.log(
    //   "🚀 ~ file: postController.js:30 ~ getAllPosts ~ postDetails:",
    //   postDetails
    // );

    const user_id = req.userId;

    const postsWithLikes = await postModal.aggregate([
      {
        $lookup: {
          from: "likes", // Assuming the name of the likes collection is "likes"
          localField: "_id",
          foreignField: "post_id",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "users", // Assuming the name of the users collection is "users"
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          "user.emailPhone": 1,
          "user.fullName": 1,
          "user.imageUrl": 1,
          media_url: 1,
          media_type: 1,
          caption: 1,
          location: 1,
          likeCount: { $size: "$likes" },
          liked: {
            $in: [
              new mongoose.Types.ObjectId(user_id), // Convert user_id to ObjectId
              { $map: { input: "$likes", as: "like", in: "$$like.user_id" } }
            ],
          },
        },
      },
    ]);
    
    console.log(
      "🚀 ~ file: postController.js:58 ~ getAllPosts ~ postsWithLikes:",
      postsWithLikes
    );

    if (!postsWithLikes)
      return res.status(404).json({ message: "No post found!" });
    return res.status(200).json(postsWithLikes);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { createPost, getAllPosts };
