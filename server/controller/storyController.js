const storyModel = require("../model/storyModel");

const createStory = async (req, res) => {
  try {
    const { user_id, mediaUrl } = req.body;
    const expireAt = new Date();
    expireAt.setHours(expireAt.getHours() + 24);
    const newStory = new storyModel({
      user_id,
      mediaUrl,
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
