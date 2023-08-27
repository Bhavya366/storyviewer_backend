const Slide = require("../models/slide");
const Story = require("../models/story");

exports.getSlides = async (req, res) => {

  //getting all slides depending on id of the slide
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

//updates the slide
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
    slide.bookmark = req.body.bookmark || slide.bookmark
    slide.bookedBy = req.body.bookedBy || slide.bookedBy
    slide.likedBy = req.body.likedBy || slide.likedBy
    slide.likeCount = req.body.likeCount || slide.likeCount

    await slide.save();
    res.status(200).json({ message: "slide updated successfully" });
  } catch (err) {
    (err);
    res.status(400).json("Error: " + err);
  }
};
//filtering all categories
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

//eporting all filtered categories
exports.getFilteredCategories = async(req,res) =>{
    let categories = req.query.category;
    let search = req.query.search || "";
    try {
        let slides = await Slide.find();
        
        let slide = "";
        if(categories === "All"){
          slide = slides;
        }
        else{
          slide = await Slide.find({ category: { $regex: search, $options: "i" } })
          .where('category')
          .in(categories)
        }
        res.send({
            slide,
            categories
        })
    }
    catch (err) {
        next(new Error("Something went wrong! Please try after some time."));
    }
}

//increase like or decrease like depending on true or false if it is true likecount will increase by 1 and if false like count will decrease by 1 
//and adding or removing user from likedBy if we remove the user then colour of like symbol is light if user exists in likedBy array the colour of like symbol is red
exports.increaseLikeById = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    const incOrdec = req.params.ClickedLike
    let arr = slide.likedBy;
    if(arr.indexOf(req.params.username) == -1){
      arr.push(req.params.username)
      slide.likeCount = slide.likeCount + 1;
    }
    else{
      const newA = arr.slice(0,arr.indexOf(req.params.username)).concat(arr.slice(arr.indexOf(req.params.username)+1))
      slide.likeCount = slide.likeCount - 1;
      arr = newA
    }
    slide.likedBy = arr;
    await slide.save();
    res.json(slide);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

//adding or removing user from bookedBy if we remove the user then colour of bookmark symbol is light if user exists in bookedBy array the colour of bookmark symbol is blue

exports.setBookmarks = async(req,res) => {
  try{

    const slide = await Slide.findById(req.params.id);
    let arr = slide.bookedBy;
    if(arr.indexOf(req.params.username) == -1){
      arr.push(req.params.username)
      slide.bookmark = true;
    }
    else{
      const newA = arr.slice(0,arr.indexOf(req.params.username)).concat(arr.slice(arr.indexOf(req.params.username)+1))
      arr = newA
      slide.bookmark = false;
    }
    slide.bookedBy = arr;
    await slide.save();
    res.json(slide);
  }catch(err){
    res.status(400).json("Error : "+err)
  }
} 

//getting all bookmarked stories by user
exports.getBookmarks = async(req,res) =>{
  try {
    const filter = {};
    if (req.params.username){
      filter.bookmark = true;
    }
    const slides = await Slide.find({ bookedBy: { $elemMatch: { $eq: req.params.username } } })
    res.json(slides);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}

//adding new slide
exports.addSlide = async (req, res) => {
  try {
    const newSlide = new Slide({
      storyId: req.body.storyId,
      heading: req.body.heading,
      imageLink: req.body.imageLink,
      description: req.body.description,
      category: req.body.category,
      user:req.body.user,
      likeCount:req.body.likeCount,
      bookmark:req.body.bookmark,
      bookedBy:req.body.bookedBy,
      likedBy:req.body.likedBy,
    });    
    const savedSlide = await newSlide.save();
    await Story.findByIdAndUpdate(req.body.storyId)
    res.json(savedSlide);

  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};