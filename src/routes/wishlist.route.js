"use strict";

const router = require("express").Router();
const verifyToken = require("../middlewares/auth.middleware");
const {
  getWishlist,
  postWishlist,
  deleteWishlist,
} = require("../controllers/wishlist.controller");

// GET route: /api/wishlist
router.get("/", verifyToken, getWishlist);

// POST route: /api/wishlist
router.post("/", verifyToken, postWishlist);

// DELETE route: /api/wishlist/:id
router.delete("/:id", verifyToken, deleteWishlist);

module.exports = router;
