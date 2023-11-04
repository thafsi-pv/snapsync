const { default: mongoose, mongo } = require("mongoose");
const chatModel = require("../model/chatModel");

const createChat = async (req, res) => {
  try {
    const data = req.body;
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
    res.status(200).json(chatMessages);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getRecentChats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const recentChats = await getRecentChatsList(userId);

    res.status(200).json(recentChats);
  } catch (error) {
    console.error("Error getting recent chats:", error);
    throw error;
  }
};

const getRecentChatsList = async (Id) => {
  const userId = new mongoose.Types.ObjectId(Id);
  const recentChats = await chatModel.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { recipient: userId }],
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort by the most recent messages
    },
    {
      $group: {
        _id: {
          $cond: [{ $eq: ["$sender", userId] }, "$recipient", "$sender"],
        },
        latestMessage: { $first: "$$ROOT" }, // Get the most recent message
      },
    },
    {
      $replaceRoot: { newRoot: "$latestMessage" }, // Replace root with the most recent message
    },
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "senderInfo",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "recipient",
        foreignField: "_id",
        as: "recipientInfo",
      },
    },
    {
      $unwind: "$senderInfo",
    },
    {
      $unwind: "$recipientInfo",
    },
    {
      $project: {
        _id: 1,
        message: 1,
        createdAt: 1,
        senderInfo: 1,
        recipientInfo: 1,
      },
    },
  ]);
  return recentChats;
};

const readAllMessage = async (req, res) => {
  try {
    console.log(
      "🚀 ~ file: chatController.js:99 ~ readAllMessage ~ req.body:",
      req.body
    );
    const { sender, recipient } = req.body;
    const result = await chatModel.updateMany(
      { sender, recipient },
      { $set: { isRead: true } }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const isReadUpdate = async (_id, flag) => {
  const update = await chatModel.findByIdAndUpdate(_id, { isRead: flag });
  return update;
};

module.exports = {
  createChat,
  getChats,
  getRecentChats,
  getRecentChatsList,
  isReadUpdate,
  readAllMessage,
};
