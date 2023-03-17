const mongoose = require("mongoose");

const courses = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  chapter: [
    {
      day: Number,
      topics: Array,
    },
  ],
});

module.exports = mongoose.model("courses", courses);
