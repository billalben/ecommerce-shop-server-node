"use strict";

const Product = require("../models/product.model");

// Get products by category prefix or by ids
const getProducts = async (req, res) => {
  const { cat_prefix, ids } = req.query;

  if (ids) {
    try {
      const products = await Product.find({ _id: { $in: ids.split(",") } });
      return res.json(products);
    } catch (error) {
      return res.status(500).json(error?.message);
    }
  }

  // Get products by category prefix
  if (cat_prefix) {
    try {
      const products = await Product.find({
        cat_prefix,
      });
      return res.json(products);
    } catch (error) {
      return res.status(500).json(error?.message);
    }
  }

  return res.status(400).json("Missing query parameter");
};

module.exports = {
  getProducts,
};
