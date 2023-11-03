const { default: mongoose, mongo } = require("mongoose");
const chatModel = require("../model/chatModel");

const createChat = async (req, res) => {
  try {
    const data = req.body;
    console.log("🚀 ~ file: chat.js:6 ~ createChat ~ data:", data);

    const newChat = await chatModel.create(req.body);
    res.status(200).json({ message: "saved successfully" });
  } catch (error) {
    res.status(400).json({ message: "error occured" });
  }
};

const getChats = async (req, res) => {
  try {
    const { sender, recipient } = req.body;
    const chatMessages = await chatModel
      .find({
        $or: [
          { sender: sender, recipient: recipient },
          { sender: recipient, recipient: sender },
        ],
      })
      .sort({ createdAt: 1 })
      .populate("sender", "email") // Populate the sender field with the username
      .populate("recipient", "email");
    console.log("🚀 ~ file: chat.js:18 ~ getChats ~ chats:", chatMessages);
    res.status(200).json(chatMessages);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getRecentChats = async (req, res) => {
  try {
    const userId = req.userId;
    const recentChats = await chatModel.aggregate([
      {
        $match: {
          $or: [
            { sender: mongoose.Types.ObjectId(userId) },
            { recipient: mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by the most recent messages
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", mongoose.Types.ObjectId(userId)] },
              "$recipient",
              "$sender",
            ],
          },
          latestMessage: { $first: "$$ROOT" }, // Get the most recent message
        },
      },
      {
        $replaceRoot: { newRoot: "$latestMessage" }, // Replace root with the most recent message
      },
      {
        $lookup: {
          from: "users", // The name of the users collection
          localField: "_id",
          foreignField: "_id",
          as: "senderInfo",
        },
      },
      {
        $unwind: "$senderInfo",
      },
    ]);

    res.status(200).json(recentChats);
  } catch (error) {
    console.error("Error getting recent chats:", error);
    throw error;
  }
};

module.exports = { createChat, getChats, getRecentChats };
