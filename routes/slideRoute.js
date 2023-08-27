const express = require("express");

const { addSlide,
    getAllCategories,
    getSlides,increaseLikeById,
    setBookmarks,getBookmarks,getFilteredCategories,
    updateSlideById ,} = require("../controllers/slide");

const authenticateUser = require("../middlewares/auth");

const slideRouter = express.Router();

slideRouter.route("/")
    .get(getAllCategories)
    .post(authenticateUser,addSlide)
    .put(authenticateUser,updateSlideById);
    
slideRouter.route('/getFilteredCategory').get(getFilteredCategories)
slideRouter.route('/getSlides')
    .get(getSlides)

slideRouter.route("/:id/like/:username").put(increaseLikeById);
slideRouter.route("/:id/bookmarks/:username").put(setBookmarks);
slideRouter.route("/getbookmarks/:username").get(getBookmarks);
module.exports = slideRouter;