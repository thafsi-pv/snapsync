const { default: mongoose } = require("mongoose");
const commentModel = require("../model/commentModel");
const post = require("../model/postModel");

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
    const user_id = req.userId;
    const comments = await post.aggregate([
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
          from: "comments",
          localField: "_id",
          foreignField: "post_id",
          as: "comments",
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
          from: "users",
          localField: "comments.user_id",
          foreignField: "_id",
          as: "commentedUsers",
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
          user: 1,
          media_url: 1,
          media_type: 1,
          caption: 1,
          location: 1,
          createdAt: 1,
          likeCount: { $size: "$likes" },
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                _id: "$$comment._id",
                comment: "$$comment.comment",
                createdAt: "$$comment.createdAt",
                updatedAt: "$$comment.updatedAt",
                user: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$commentedUsers",
                        as: "user",
                        cond: { $eq: ["$$user._id", "$$comment.user_id"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
          liked: {
            $in: [
              new mongoose.Types.ObjectId(user_id),
              { $map: { input: "$likes", as: "like", in: "$$like.user_id" } },
            ],
          },
          // savedposts: 1,
          saved: {
            $in: [
              new mongoose.Types.ObjectId(user_id),
              {
                $map: {
                  input: "$savedposts",
                  as: "saved",
                  in: "$$saved.user_id",
                },
              },
            ],
          },
        },
      },
    ]);

    // Remove 'password' field from user details in posts
    comments.forEach((comment) => {
      comment.comments.forEach((commentDetail) => {
        if (commentDetail.user) {
          // Modify the user object to exclude the 'password' field
          commentDetail.user = {
            _id: commentDetail.user._id,
            emailPhone: commentDetail.user.emailPhone,
            fullName: commentDetail.user.fullName,
            userName: commentDetail.user.userName,
            imageUrl: commentDetail.user.imageUrl,
            isVerified: commentDetail.user.isVerified,
          };
        }
      });

      // Remove 'password' field from user details in the post
      comment.user = comment.user.map((userDetail) => ({
        _id: userDetail._id,
        emailPhone: userDetail.emailPhone,
        fullName: userDetail.fullName,
        userName: userDetail.userName,
        imageUrl: userDetail.imageUrl,
        isVerified: userDetail.isVerified,
      }));
    });

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
