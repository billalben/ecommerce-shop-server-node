const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB, disconnectDB } = require("./src/config/mongoose.config");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

const isProduction = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: isProduction ? process.env.FRONTEND_URL : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", require("./src/routes/users.route"));
app.use("/api/auth", require("./src/routes/auth.route"));
app.use("/api/categories", require("./src/routes/categories.route"));
app.use("/api/products", require("./src/routes/products.route"));
app.use("/api/wishlist", require("./src/routes/wishlist.route"));
app.use("/api/orders", require("./src/routes/orders.route"));

app.get("/", (req, res) => {
  res.send("Welcome to E-commerce Shop API");
});

const server = app.listen(5501, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log(`Server is running on http://localhost:5501`);
});

server.on("close", async () => await disconnectDB());
