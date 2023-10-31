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
const app = express();

const http = require("http");
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

//socket
const connectedUsers = [];
io.on("connection", (socket) => {
  console.log("🚀 ~ file: index.js:41 ~ io.on ~ socket:", socket.id);
  const token = socket.handshake.query.token;
  console.log("🚀 ~ file: index.js:43 ~ io.on ~ token:", token)
});

const PORT = process.env.PORT || 3457;
server.listen(PORT, () => console.log("server started at " + PORT));
