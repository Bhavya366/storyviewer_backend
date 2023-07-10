const express = require("express");
const authenticateUser = require("../middlewares/auth");

const {
    // getAllProducts,
    addStory,
    // getProductById,
    // updateProductById,
    // increaseLikeById,
  } = require("../controllers/story");
  
  const storyRouter = express.Router();
  
  storyRouter
    .route("/")
    .post(authenticateUser,addStory)
//   productRouter.route("/:id/like").put(increaseLikeById);
//   productRouter.route("/:id").get(getProductById);
  
  module.exports = storyRouter;