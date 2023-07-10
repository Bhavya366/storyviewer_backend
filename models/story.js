const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
//   slide: {
//     type: [String],
//     required: true,
//   },
//   likes: {
//     type: Number,
//     default: 0,
//   },
//   bookmark: {
//     type: Boolean,
//     default: 0,
//   },
});

const Story = mongoose.model("Story",storySchema);

module.exports = Story;