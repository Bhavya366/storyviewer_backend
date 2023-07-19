const Story = require("../models/story");
const Slide = require('../models/slide');

exports.getStories = async (req, res) => {
  try {
    const filter = {};
    const user = req.query.user;
    let array = []
    let search = req.query.search || "";

    const story = await Story.find({ user: user })
    const all_stories = story.flatMap(item => item._id);
    unique = [...new Set(all_stories)]
    for(var i=0;i<unique.length;i++){
      const filter = {};
      if (unique[i]){
      filter.storyId = JSON.parse(JSON.stringify(unique[i]));
      }
      const slides = await Slide.find(filter);
      if(slides!=null){
        array = [...array,slides[0]]
      }
      
    }
    res.send({array,unique})

  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.addStory = async (req, res) => {
  const newStory = new Story({
    user : req.body.user
  });
  try {
    await newStory.save();
    res.json({ id: newStory.id });
  } catch (err) {
    res.status(400).json("Hoya:Error: " + err);
  }
};

