"use strict";

const Order = require("../models/order.model");

const getOrders = async (req, res) => {
  const { userId } = req.query;

  if (userId) {
    try {
      const orders = await Order.find({
        userId,
      });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json(error?.message);
    }
  }

  return res.status(400).json("Invalid query");
};

const createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json(error?.message);
  }
};

module.exports = {
  getOrders,
  createOrder,
};
