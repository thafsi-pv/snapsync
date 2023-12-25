const { default: mongoose } = require("mongoose");
const postModal = require("../model/postModel");
const followsModel = require("../model/followsModel");
const savedPostModel = require("../model/savedPostModel");

// const createPost = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { _id, media_url, caption, location, media_type } = req.body;
//     if (!userId) return res.status(404).json({ message: "User not found!" });

//     const post = { user_id: userId, media_url, caption, location, media_type };
//     const newPost = await postModal.create(post);

//     return res.status(200).json(newPost);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// };

const createPost = async (req, res) => {
  try {
    console.log(
      "🚀 ~ file: postController.js:26 ~ createPost ~ req.body:",
      req.body
    );
    const userId = req.userId;
    const { _id, files, caption, location, media_type } = req.body;

    if (!userId) return res.status(404).json({ message: "User not found!" });

    // const post = { user_id: userId, media_url, caption, location, media_type };
    const post = { user_id: userId, files, caption, location, media_type };

    // Check if _id exists in the request body
    if (_id) {
      // If _id exists, update the existing post
      const updatedPost = await postModal.findByIdAndUpdate(_id, post, {
        new: true,
      });
      return res.status(200).json(updatedPost);
    } else {
      // If _id does not exist, create a new post
      const newPost = await postModal.create(post);
      return res.status(200).json(newPost);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating/updating post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
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
          "user.isVerified": 1,
          files: 1,
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
      { $skip: (page - 1) * limit },
      {
        $limit: parseInt(limit),
      },
    ]);
    if (!postsWithLikes || postsWithLikes.length === 0)
      return res.status(202).json({ message: "No post found!" });
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
      res
        .status(200)
        .json({ message: "Post removed from saved posts", flag: false });
    } else {
      const savePostInstance = new savedPostModel({ user_id: userId, post_id });
      const savedPost = await savePostInstance.save();
      res
        .status(201)
        .json({ message: "Post saved successfully", savedPost, flag: true });
    }
  } catch (error) {
    console.error("Error saving/removing post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSavedPosts = async (req, res) => {
  const userId = req.userId;
  try {
    const savedPosts = await savedPostModel.aggregate([
      {
        $match: { user_id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post_id",
          foreignField: "_id",
          as: "posts",
        },
      },
      { $unwind: "$posts" },
      {
        $project: {
          caption: "$posts.caption",
          location: "$posts.location",
          files: "$posts.files",
          user_id: "$posts.user_id",
          _id: "$posts._id",
        },
      },
    ]);
    res.status(200).json(savedPosts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getReels = async (req, res) => {
  try {
    const reels = await postModal.aggregate([
      {
        $match: { "files.fileType": /^video\// },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
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
        $project: {
          files: {
            $filter: {
              input: "$files",
              as: "file",
              cond: { $eq: ["$$file.fileType", "video/mp4"] },
            },
          },
          caption: 1,
          location: 1,
          createdAt: 1,
          likeCount: { $size: "$likes" },
          commentCount: { $size: "$comments" },
          user: 1,
        },
      },
    ]);


    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getReels = async (req, res) => {
//   try {
//     const reels = await postModal.aggregate([
//       {
//         $match: {
//           "files.fileType": /^video\//,
//         },
//       },
//       {
//         $project: {
//           _id: 0, // Exclude _id field if not needed
//           files: {
//             $filter: {
//               input: "$files",
//               as: "file",
//               cond: { $eq: ["$$file.fileType", "video/mp4"] },
//             },
//           },
//         },
//       },
//     ]);

//     res.status(200).json(reels);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const deletePostById = async (req, res) => {
  try {
    const postId = req.query.postId;
    console.log(
      "🚀 ~ file: postController.js:288 ~ deletePostById ~ postId:",
      postId
    );

    // Check if the post exists
    const existingPost = await postModal.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the post
    await postModal.findByIdAndRemove(postId);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Assuming you have your postModal defined somewhere using Mongoose, for example:
// const postModal = mongoose.model('Post', postSchema);

module.exports = {
  createPost,
  getAllPosts,
  getEntiryPost,
  savePost,
  getSavedPosts,
  getReels,
  deletePostById,
};
