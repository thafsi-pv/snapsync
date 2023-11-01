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

module.exports = { createChat, getChats };