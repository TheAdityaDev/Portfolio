const mongoose = require("mongoose");
require("dotenv").config();

const isDatabaseReady = () => mongoose.connection.readyState === 1;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("MONGODB_URI is missing. Starting without a database connection.");
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
    return false;
  }
};

module.exports = {
  connectDB,
  isDatabaseReady,
};
