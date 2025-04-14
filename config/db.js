// db.js
const mongoose = require('mongoose');
const colors = require("colors");

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log(colors.bgBlue("Successfully connected to the database"));
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

// Export the connection function
module.exports = connectDB;
