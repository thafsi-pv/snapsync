const express = require("express");
const cors = require("cors");
const { authRouter } = require("./router/auth");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
connectDb();

app.use("api/auth", authRouter);

const PORT = process.env.PORT || 3457;
app.listen(PORT, () => console.log("server started at " + PORT));
