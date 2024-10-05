"use strict";

const router = require("express").Router();
const { getCategories } = require("../controllers/categories.controller");

// GET route: /api/categories (Public)
router.get("/", getCategories);

module.exports = router;
