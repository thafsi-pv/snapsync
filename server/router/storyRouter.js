const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { getStoriesOfFollowers, createStory, checkUserHavingStory } = require("../controller/storyController");

const storyRouter = express.Router();

storyRouter.post("/", checkAuth, createStory);
storyRouter.get("/", checkAuth, getStoriesOfFollowers);
storyRouter.get("/havigstory", checkAuth, checkUserHavingStory);

module.exports = { storyRouter };
