const express = require("express");
const cors = require("cors");
const { authRouter } = require("./router/auth");
require("dotenv").config();
const connectDb = require("./config/db");
const path = require("path");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'assets')));
connectDb();

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3457;
app.listen(PORT, () => console.log("server started at " + PORT));
