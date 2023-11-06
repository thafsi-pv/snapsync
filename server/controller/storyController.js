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

module.exports = createStory;
