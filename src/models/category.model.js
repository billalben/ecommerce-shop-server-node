const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  prefix: { type: String, required: true },
  img: { type: String, required: true },
});

module.exports = mongoose.model("Category", CategorySchema);
