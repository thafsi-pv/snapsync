const { default: mongoose, mongo } = require("mongoose");
const chatModel = require("../model/chatModel");
const textMessageModal = require("../model/textMessageModal");
const postMessageModal = require("../model/postMessageModal");
const profileMessageModel = require("../model/profileMessageModel");

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
    const chatMessage = createChatFn(req.body);
    res.status(201).json(chatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

async function createChatFn(chat) {
  const { sender, recipient, messageType, message, isRead } = chat;

  let messageObject;
  switch (messageType) {
    case "TextMessage":
      messageObject = await textMessageModal.create({ text: message });
      break;
    case "PostMessage":
      messageObject = await postMessageModal.create({ postId: message });
      break;
    case "ProfileMessage":
      messageObject = await profileMessageModel.create({ profileId: message });
      break;
    default:
      return res.status(400).json({ message: "Invalid messageType" });
  }

  const chatMessage = await chatModel.create({
    sender,
    recipient,
    messageType,
    message: messageObject._id,
    isRead,
  });
  return chatMessage;
}

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
      .populate("sender", "email")
      .populate("recipient", "email");

    // Populate details based on messageType
    for (const chat of chatMessages) {
      try {
        switch (chat.messageType) {
          case "TextMessage":
            await chat.populate("message");
            break;
          case "PostMessage":
            await chat.populate({
              path: "message",
              populate: {
                path: "postId",
                populate: { path: "user_id" },
              },
            });
            break;
          case "ProfileMessage":
            await chat
              .populate("message")
              .execPopulate({ path: "message.profileId" });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error populating message:", error);
      }
    }

    res.status(200).json(chatMessages);
  } catch (error) {
    console.log("🚀 ~ file: chatController.js:131 ~ getChats ~ error:", error);
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

// const getRecentChatsList = async (Id) => {
//   const userId = new mongoose.Types.ObjectId(Id);
//   const recentChats = await chatModel.aggregate([
//     {
//       $match: {
//         $or: [{ sender: userId }, { recipient: userId }],
//       },
//     },
//     {
//       $sort: { createdAt: -1 }, // Sort by the most recent messages
//     },
//     {
//       $group: {
//         _id: {
//           $cond: [{ $eq: ["$sender", userId] }, "$recipient", "$sender"],
//         },
//         latestMessage: { $first: "$$ROOT" }, // Get the most recent message
//       },
//     },
//     {
//       $replaceRoot: { newRoot: "$latestMessage" }, // Replace root with the most recent message
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "sender",
//         foreignField: "_id",
//         as: "senderInfo",
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "recipient",
//         foreignField: "_id",
//         as: "recipientInfo",
//       },
//     },

//     {
//       $unwind: "$senderInfo",
//     },
//     {
//       $unwind: "$recipientInfo",
//     },
//     {
//       $project: {
//         _id: 1,
//         message: 1,
//         createdAt: 1,
//         senderInfo: 1,
//         recipientInfo: 1,
//         messageType: 1,
//         messageData:1
//       },
//     },
//   ]);
//   console.log(
//     "🚀 ~ file: chatController.js:195 ~ getRecentChatsList ~ recentChats:",
//     recentChats
//   );
//   return recentChats;
// };

const getRecentChatsList = async (Id) => {
  const userId = new mongoose.Types.ObjectId(Id);
  const recentChats = await chatModel.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { recipient: userId }],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: {
          $cond: [{ $eq: ["$sender", userId] }, "$recipient", "$sender"],
        },
        latestMessage: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$latestMessage" },
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
      $lookup: {
        from: "textmessages",
        localField: "message",
        foreignField: "_id",
        as: "textMessage",
      },
    },
    {
      $lookup: {
        from: "postmessages",
        localField: "message",
        foreignField: "_id",
        as: "postMessage",
      },
    },
    {
      $lookup: {
        from: "profilemessages",
        localField: "message",
        foreignField: "_id",
        as: "profileMessage",
      },
    },
    {
      $addFields: {
        messageTypeDetails: {
          $switch: {
            branches: [
              {
                case: { $eq: ["$messageType", "TextMessage"] },
                then: { $arrayElemAt: ["$textMessage", 0] },
              },
              {
                case: { $eq: ["$messageType", "PostMessage"] },
                then: { $arrayElemAt: ["$postMessage", 0] },
              },
              {
                case: { $eq: ["$messageType", "ProfileMessage"] },
                then: { $arrayElemAt: ["$profileMessage", 0] },
              },
            ],
            default: null,
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        message: 1,
        createdAt: 1,
        senderInfo: 1,
        recipientInfo: 1,
        messageType: 1,
        messageTypeDetails: 1,
        isRead: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
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
      { sender: recipient, recipient: sender },
      { $set: { isRead: true } }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const isReadUpdate = async (_id, flag) => {
  const update = await chatModel.findByIdAndUpdate(
    _id,
    { isRead: flag },
    { new: true }
  );
  return update;
};

module.exports = {
  createChat,
  getChats,
  getRecentChats,
  getRecentChatsList,
  isReadUpdate,
  readAllMessage,
  createChatFn,
};
