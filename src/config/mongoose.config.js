"use strict";

const mongoose = require("mongoose");

const connectDB = async (connectionURI) => {
  try {
    await mongoose.connect(connectionURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error?.message);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Database disconnection failed", error?.message);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
