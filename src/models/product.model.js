const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  cat_prefix: { type: String, required: true },
  img: { type: String, required: true },
  max: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
