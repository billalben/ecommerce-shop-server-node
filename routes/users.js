const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { model } = require("mongoose");

// check if user is exist (?email=)
router.get("/", async (req, res) => {
  const { email } = req.query;

  console.log(email);

  try {
    if (email) {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.json({ message: "User not found", exists: false });
      }

      // res.json(user);
      res.json({ message: "User found", exists: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
