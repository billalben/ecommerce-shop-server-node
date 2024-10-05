"use strict";

const router = require("express").Router();
const { getProducts } = require("../controllers/products.controller");

// GET route: /api/products
router.get("/", getProducts);

module.exports = router;
