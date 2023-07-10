const Story = require("../models/story");

exports.addStory = async (req, res) => {

    const newStory = new Story({});
    try {
      await newStory.save();
      res.json("Story added!");
    } catch (err) {
      res.status(400).json("Hoya:Error: " + err);
    }

};
