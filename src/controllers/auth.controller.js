const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) return res.status(400).json("Email already exists");

  console.log("firstname", firstName);
  console.log("lastname", lastName);
  console.log("email", email);
  console.log("password", password);

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json("All fields are required");
  }

  try {
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      imageProfile: `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`,
    });

    res.status(201).json("User registered successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("No user found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid Email or Password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      user: {
        ...user.toObject(),
        password: undefined,
      },
      token,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  register,
  login,
};
