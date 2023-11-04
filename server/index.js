const express = require("express");
const cors = require("cors");
const { authRouter } = require("./router/auth");
require("dotenv").config();
const connectDb = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const likeRouter = require("./router/likeRouter");
const commentRouter = require("./router/commentRouter");
const chatModal = require("./model/chatModel");
const app = express();

const http = require("http");
const { verifyToken } = require("./utils/jwt");
const { connection } = require("mongoose");
const chatRouter = require("./router/chatRouter");
const {
  isReadUpdate,
  getRecentChats,
  getRecentChatsList,
} = require("./controller/chatController");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methords: ["GET", "POST"],
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "assets")));
app.use(cookieParser());
connectDb();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/post", postRouter);

app.use("/api/like", likeRouter);
app.use("/api/comment", commentRouter);
app.use("/api/chat", chatRouter);

//socket
const connectedUsers = new Map();
io.on("connection", (socket) => {
  try {
    const token = socket.handshake.query.token;
    const verifyT = verifyToken(token);
    const userId = verifyT._id;

    if (connectedUsers.has(userId)) {
      const existingSocket = connectedUsers.get(userId);
      io.to(existingSocket).emit(
        "forceDisconnect",
        "You've logged in from another device."
      );
      connectedUsers.delete(userId);
    }
    connectedUsers.set(userId, socket.id);
    socket.on("newChat", (userId) => {
      if (connectedUsers.has(userId)) {
        const existingSocket = connectedUsers.get(userId);
        io.to(socket.id).emit("usersocketId", existingSocket);
      } else {
        io.to(socket.id).emit("usersocketId", 0);
      }
      return;
    }),
      socket.on(
        "private message",
        async ({ sender, recipient, recipientSocketId, message }) => {
          const data = { sender, recipient, message };
          console.log("🚀 ~ file: index.js:91 ~ data:", data);

          if (recipientSocketId) {
            data.isRead = true;
            const newChat = await chatModal.create(data);
            socket.to(recipientSocketId).emit("private message", {
              //sender: socket.id,
              _id: newChat._id,
              sender,
              message,
            });
          } else {
            data.isRead = false;
            const newChat = await chatModal.create(data);
          }
        }
      );
    socket.on("isReadUpdata", async ({ _id, flag }) => {
      const update = await isReadUpdate(_id, flag);
    });

    socket.on("recentChatList", async (_id) => {
      try {
        const recentChats = await getRecentChatsList(_id);
        const updatedList = recentChats.map((chats) => {
          const checkuserid =
            chats.senderInfo._id == _id
              ? chats.recipientInfo._id.toString()
              : chats.senderInfo._id.toString();
          if (connectedUsers.has(checkuserid)) {
            const socketId = connectedUsers.get(checkuserid);
            chats.socketId = socketId;
          } else {
            chats.socketId = 0;
          }
          return chats;
        });

        socket.emit("recentChatList", updatedList);
      } catch (error) {
        console.error("Error:", error);
        // Handle errors as needed
      }
    });

    //handle disconnecion
    socket.on("disconnect", () => {
      if (
        connectedUsers.has(userId) &&
        connectedUsers.get(userId) === socket.id
      ) {
        connectedUsers.delete(userId);
      }
    });
  } catch (error) {
    console.log("🚀 ~ file: index.js:85 ~ io.on ~ error:", error);
  }
});

const PORT = process.env.PORT || 3457;
server.listen(PORT, () => console.log("server started at " + PORT));
