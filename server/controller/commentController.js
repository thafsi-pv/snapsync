const commentModel = require("../model/commentModel");
const Post = require("../model/postModel");

const commentPost = async (req, res) => {
  try {
    const { comment, post_id } = req.body;
    const user_id = req.userId;
    const newcomment = await commentModel.create({
      post_id,
      user_id,
      comment,
    });
    return res.status(200).json(newcomment);
  } catch (error) {
    console.error("Error in commentPost:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const post_id = new mongoose.Types.ObjectId(req.query.post_id);

    const comments = await postModal.aggregate([
      {
        $match: { _id: post_id },
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
          localField: "post_id",
          foreignField: "_id",
          as: "comments",
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
          createdAt: 1,
          likeCount: { $size: "$likes" },
          liked: {
            $in: [
              new mongoose.Types.ObjectId(user_id), // Convert user_id to ObjectId
              { $map: { input: "$likes", as: "like", in: "$$like.user_id" } },
            ],
          },
        },
      },
    ]);

    res.status(200).json(comments);
  } catch (error) {
    console.log(
      "🚀 ~ file: commentController.js:75 ~ getCommentsByPostId ~ error:",
      error
    );
    res.status(500).json(error);
  }
};

module.exports = { commentPost, getCommentsByPostId };
