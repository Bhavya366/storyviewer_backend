const express = require("express");
const { addSlide} = require("../controllers/slide");

const slideRouter = express.Router();

slideRouter.route("/")
    .post(addSlide);

module.exports = slideRouter;