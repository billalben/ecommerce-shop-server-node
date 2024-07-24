const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Get all orders
router.get("/", async (req, res) => {
  const { userId } = req.query;

  if (userId) {
    try {
      const orders = await Order.find({
        userId,
      });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(400).json({ message: "Invalid query" });
});

// Get orders by user ID
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     if (orders.length === 0)
//       return res.status(404).json({ message: "No orders found for this user" });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Create a new order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an order
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//     if (!deletedOrder)
//       return res.status(404).json({ message: "Order not found" });
//     res.json({ message: "Order deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
