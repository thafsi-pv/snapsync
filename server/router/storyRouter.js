const express = require("express");
const createStory = require("../controller/storyController");

const storyRouter = express.Router();

storyRouter.post("/", createStory);

module.exports = { storyRouter };
