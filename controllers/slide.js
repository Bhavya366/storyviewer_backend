const Slide = require("../models/slide");
const Story = require("../models/story");

exports.addSlide = async (req, res) => {
  try {
    const newSlide = new Slide({
        storyId: req.body.storyId,
        heading:req.body.heading,
        imageLink:req.body.imageLink,
        description:req.body.description,
        category:req.body.category,
    });

    const savedSlide = await newSlide.save();
    await Story.findByIdAndUpdate(req.body.storyId)
    res.json(savedSlide);

  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};