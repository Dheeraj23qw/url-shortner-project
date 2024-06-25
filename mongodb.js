
const mongoose = require('mongoose')

// Connect to MongoDB server
async function connectToDB() {
    try {
      await mongoose.connect("mongodb://localhost:27017/short-url");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  module.exports = {
    connectToDB
  }