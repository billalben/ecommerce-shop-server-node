"use strict";

const router = require("express").Router();
const { getOrders, createOrder } = require("../controllers/orders.controller");

// GET route: /api/orders
router.get("/", getOrders);

// POST route: /api/orders
router.post("/", createOrder);

module.exports = router;
