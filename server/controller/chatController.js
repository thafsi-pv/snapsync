const { default: mongoose, mongo } = require("mongoose");
const chatModel = require("../model/chatModel");
const {
  TextMessage,
  PostMessage,
  ProfileMessage,
} = require("../model/messageModel");

// const createChat = async (req, res) => {
//   try {
//     const data = req.body;
//     const newChat = await chatModel.create(req.body);
//     res.status(200).json({ message: "saved successfully" });
//   } catch (error) {
//     res.status(400).json({ message: "error occured" });
//   }
// };

// const getChats = async (req, res) => {
//   try {
//     const { sender, recipient } = req.body;
//     console.log("🚀 ~ file: chatController.js:17 ~ getChats ~ req.body:", req.body)
//     const chatMessages = await chatModel
//       .find({
//         $or: [
//           { sender: sender, recipient: recipient },
//           { sender: recipient, recipient: sender },
//         ],
//       })
//       .sort({ createdAt: 1 })
//       .populate("sender", "email")
//       .populate("recipient", "email")
//       .populate({ path: "message", model: "posts" });
//     console.log("🚀 ~ file: chatController.js:28 ~ getChats ~ chatMessages:", chatMessages)
//     res.status(200).json(chatMessages);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

const createChat = async (req, res) => {
  try {
    const { sender, recipient, messageType, message } = req.body;

    let messageObject;
    switch (messageType) {
      case "text":
        messageObject = await TextMessage.create({ text: message });
        break;
      case "post":
        // Assuming postId is provided in the request
        messageObject = await PostMessage.create({ postId: message });
        break;
      case "profile":
        // Assuming profileId is provided in the request
        messageObject = await ProfileMessage.create({ profileId: message });
        break;
      default:
        return res.status(400).json({ message: "Invalid messageType" });
    }

    const chatMessage = await chatModel.create({
      sender,
      recipient,
      messageType,
      message: messageObject._id,
      isRead: false,
    });

    res.status(201).json(chatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getChats = async (req, res) => {
  try {
    const { sender, recipient } = req.body;
    console.log(
      "🚀 ~ file: chatController.js:39 ~ getChats ~ req.body:",
      req.body
    );
    const chatMessages = await Chat.find({
      $or: [
        { sender: sender, recipient: recipient },
        { sender: recipient, recipient: sender },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "email")
      .populate("recipient", "email");

    // Populate details based on messageType
    for (const chat of chatMessages) {
      switch (chat.messageType) {
        case "text":
          await chat.populate("message").execPopulate();
          break;
        case "post":
          await chat.populate("message", "postId").execPopulate();
          break;
        case "profile":
          await chat.populate("message", "profileId").execPopulate();
          break;
        default:
          break;
      }
    }
    console.log(
      "🚀 ~ file: chatController.js:48 ~ getChats ~ chatMessages:",
      chatMessages
    );

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
