const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get products by category prefix or by ids
router.get("/", async (req, res) => {
  const { cat_prefix, ids } = req.query;

  if (ids) {
    try {
      const products = await Product.find({ _id: { $in: ids.split(",") } });
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
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
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(400).json({ message: "Missing query parameter" });
});

module.exports = router;
