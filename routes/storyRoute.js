const express = require("express");
const authenticateUser = require("../middlewares/auth");

const {
    
    addStory,
    getStories,
    // setStories,

  } = require("../controllers/story");
  
  const storyRouter = express.Router();
  
  storyRouter
    .route("/")
    .get(getStories)
    .post(authenticateUser,addStory)


  
  module.exports = storyRouter;