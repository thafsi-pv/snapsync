const userModal = require("../model/userModel");

const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = await userModal.findOne({ _id: userId });
    if (!userDetails)
      return res.status(404).json({ message: "User not found!" });
    return res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getSuggestionUsers = async (req, res) => {
  try {
    const userId = req.userId;
    const suggestionList = await userModal.find();
    res.status(200).json(suggestionList);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getUserData, getSuggestionUsers };
