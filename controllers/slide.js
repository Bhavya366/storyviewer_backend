const Slide = require("../models/slide");
const Story = require("../models/story");

exports.getSlides = async (req, res) => {

  try {
    const filter = {};
    if (req.query.storyId){
      filter.storyId = req.query.storyId;
    }
    
    const slides = await Slide.find(filter);
    res.json(slides);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }

};

exports.updateSlideById = async (req, res) => {
 
  try {
    if (!req.body._id) {
      return res.status(400).json({ message: "story id is required" });
    }

    const slide = await Slide.findById(req.body._id);
    slide.heading = req.body.heading;
    slide.category = req.body.category;
    slide.imageLink = req.body.imageLink;
    slide.storyId = req.body.storyId;
    slide.description = req.body.description;

    await slide.save();
    res.status(200).json({ message: "slide updated successfully" });
  } catch (err) {
    (err);
    res.status(400).json("Error: " + err);
  }
};
exports.getAllCategories = async (req, res) => {
 
  try {
    const Slides = await Slide.find();
    const all_categories = Slides.flatMap(slide => slide.category);
    unique = [...new Set(all_categories)]

    res.send({
      categories: unique,
    })
  }
  catch (err) {
    next(new Error("Something went wrong! Please try after some time.")) 
  }
};

exports.getFilteredCategories = async(req,res) =>{
    let categories = req.query.category;
    let search = req.query.search || "";
    try {
        let slides = await Slide.find();
        let slide = "";
        slide = await Slide.find({ category: { $regex: search, $options: "i" } })
                .where('category')
                .in(categories)

        res.send({
            slide,
        })
    }
    catch (err) {
        next(new Error("Something went wrong! Please try after some time."));
    }
}

exports.increaseLikeById = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    slide.likeCount = slide.likeCount + 1;
    
    await slide.save();
    res.json(slide);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.setBookmarks = async(req,res) => {
  try{

    const slide = await Slide.findById(req.params.id);
    slide.bookmark = !slide.bookmark;

    await slide.save();
    res.json(slide);

  }catch(err){
    res.status(400).json("Error: "+err)
  }
} 

exports.getBookmarks = async(req,res) =>{
  try {
    const slides = await Slide.find({bookmark : true})
    res.json(slides);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}

exports.addSlide = async (req, res) => {
  try {
    const newSlide = new Slide({
      storyId: req.body.storyId,
      heading: req.body.heading,
      imageLink: req.body.imageLink,
      description: req.body.description,
      category: req.body.category,
    });    
    const savedSlide = await newSlide.save();
    await Story.findByIdAndUpdate(req.body.storyId)
    res.json(savedSlide);

  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};