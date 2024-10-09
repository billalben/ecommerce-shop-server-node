const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json("No token, authorization denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json("Unauthorized - invalid token");
    }

    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(500).json("Server error");
  }
};

module.exports = verifyToken;
