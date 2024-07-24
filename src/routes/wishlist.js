const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const auth = require("../middlewares/auth");
const { exists } = require("../models/Product");

// router.use(auth);

// Get a user's wishlist
router.get("/", async (req, res) => {
  const { userId, productId } = req.query;

  if (userId && productId) {
    try {
      const wishlist = await Wishlist.findOne({
        userId,
        productId,
      });

      return res.json(wishlist);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (userId) {
    try {
      const wishlists = await Wishlist.find({ userId });
      return res.json(wishlists);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: "Missing query parameters" });
});

// Add a product to the wishlist
router.post("/", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const newWishlist = new Wishlist({ userId, productId });
    const savedWishlist = await newWishlist.save();
    res.status(201).json(savedWishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a product from the wishlist
router.delete("/:id", async (req, res) => {
  try {
    const deletedWishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deletedWishlist)
      return res.status(404).json({ message: "Wishlist item not found" });
    return res.json({ message: "Wishlist item deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
