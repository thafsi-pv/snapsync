const postModal = require("../model/postModel");

const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(
      "🚀 ~ file: postController.js:6 ~ createPost ~ userId:",
      userId
    );
    const { media_url, caption, location } = req.body;
    console.log(
      "🚀 ~ file: postController.js:7 ~ createPost ~ req.body:",
      req.body
    );
    if (!userId) return res.status(404).json({ message: "User not found!" });

    const post = { user_id: userId, media_url, caption, location };
    const newPost = await postModal.create(post);

    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const postDetails = await postModal.find();
    if (!postDetails)
      return res.status(404).json({ message: "No post found!" });
    return res.status(200).json(postDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { createPost, getAllPosts };
