const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
connectDb();


const PORT = process.env.PORT || 3457;
app.listen(PORT, () => console.log("server started at " + PORT));