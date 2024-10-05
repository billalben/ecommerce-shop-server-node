"use strict";

const { model } = require("mongoose");
const Wishlist = require("../models/wishlist.model");

const getWishlist = async (req, res) => {
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
};

const postWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const newWishlist = new Wishlist({ userId, productId });
    const savedWishlist = await newWishlist.save();
    res.status(201).json(savedWishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const deletedWishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deletedWishlist)
      return res.status(404).json({ message: "Wishlist item not found" });
    return res.json({ message: "Wishlist item deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWishlist,
  postWishlist,
  deleteWishlist,
};
