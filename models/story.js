const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
});

const Story = mongoose.model("Story",storySchema);

module.exports = Story;