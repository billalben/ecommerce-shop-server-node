const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const wishlistRoutes = require("./routes/wishlist");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");

dotenv.config();

const app = express();
app.use(express.json());

const whiteList = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://shop-bz.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5001, () => console.log("Server is running on port 5001"))
  )
  .catch((err) => console.log(err));
