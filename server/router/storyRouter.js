const express = require("express");
const createStory = require("../controller/storyController");
const { checkAuth } = require("../middleware/checkAuth");

const storyRouter = express.Router();

storyRouter.post("/",checkAuth, createStory);

module.exports = { storyRouter };
