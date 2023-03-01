// const mongoose = require('m')

const { default: mongoose } = require("mongoose");

const mongodb = {
  connect() {
    mongoose.connect(process.env.MONGODB_URL);
  },
};

module.exports = mongodb;
