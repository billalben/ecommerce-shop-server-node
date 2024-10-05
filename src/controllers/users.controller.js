"use strict";

const User = require("../models/user.model");

// Check if a user exists

const userExists = async (req, res) => {
  const { email } = req.query;

  try {
    if (email) {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.json({ message: "User not found", exists: false });
      }

      res.json({ message: "User found", exists: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userExists,
};
