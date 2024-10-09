"use strict";

const Category = require("../models/category.model");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json(error?.message);
  }
};

module.exports = {
  getCategories,
};
