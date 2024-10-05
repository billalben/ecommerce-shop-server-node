"use strict";

const router = require("express").Router();
const { userExists } = require("../controllers/users.controller");

// GET route: /api/users
router.get("/", userExists);

module.exports = router;
