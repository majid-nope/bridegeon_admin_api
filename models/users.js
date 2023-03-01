const { default: mongoose } = require("mongoose");

const userModel = mongoose.Schema({
  name: String,
  email: String,
  batch: String,
  attendance: Array,
  performance: Number,
});

module.exports = mongoose.model("users", userModel);
