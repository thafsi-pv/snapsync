const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { getStoriesOfFollowers, createStory } = require("../controller/storyController");

const storyRouter = express.Router();

storyRouter.post("/", checkAuth, createStory);
storyRouter.get("/", checkAuth, getStoriesOfFollowers);

module.exports = { storyRouter };
