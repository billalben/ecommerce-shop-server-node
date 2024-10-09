"use strict";

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const setAuthToken = require("../utils/setAuthToken");

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json("Please enter all fields");
  }

  try {
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist)
      return res.status(400).json("User with this email already exists");

    await User.create({
      email,
      password,
      firstName,
      lastName,
      imageProfile: `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`,
    });

    res.status(201).json("User created successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Please enter all fields");
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    const token = setAuthToken(res, user._id);

    res.json({
      user: {
        ...user._doc,
        password: undefined,
      },
      token,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("Logged out successfully");
  } catch (error) {
    res.status(500).json(error?.message);
  }
};

module.exports = {
  register,
  login,
  logout,
};
