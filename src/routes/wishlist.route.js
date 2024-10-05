"use strict";

const router = require("express").Router();
const {
  getWishlist,
  postWishlist,
  deleteWishlist,
} = require("../controllers/wishlist.controller");

// GET route: /api/wishlist
router.get("/", getWishlist);

// POST route: /api/wishlist
router.post("/", postWishlist);

// DELETE route: /api/wishlist/:id
router.delete("/:id", deleteWishlist);

module.exports = router;
