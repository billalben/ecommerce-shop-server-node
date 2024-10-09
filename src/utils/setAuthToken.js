"use strict";

const jwt = require("jsonwebtoken");

const setAuthToken = (res, userId) => {
  // Define constants for token and cookie expiration
  const TOKEN_EXPIRATION = "1d";
  const COOKIE_EXPIRATION = 86400000; // 24 hours in milliseconds

  try {
    // Generate a JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: COOKIE_EXPIRATION,
    };

    // Set the cookie with the token
    res.cookie("token", token, cookieOptions);

    return token;
  } catch {
    throw new Error("Token generation failed.");
  }
};

module.exports = setAuthToken;
