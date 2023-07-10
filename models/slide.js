const mongoose = require("mongoose");
const Story = require("./story");

const slideSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Story,
    required: true,
  },
  heading:{
    type:String,
    required:true,
  },
  imageLink:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category:{
    type:String,
    required:true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  bookmark:{
    type:Boolean,
    default:false
  }
});

const Slide = mongoose.model("Slide", slideSchema);

module.exports = Slide;