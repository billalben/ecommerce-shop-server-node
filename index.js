const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const job = require("./src/config/cron");

dotenv.config();

job.start();

const app = express();
app.use(express.json());

const whiteList = [process.env.FRONTEND_URL];

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

app.use("/api/users", require("./src/routes/users"));
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/categories", require("./src/routes/categories"));
app.use("/api/products", require("./src/routes/products"));
app.use("/api/wishlist", require("./src/routes/wishlist"));
app.use("/api/orders", require("./src/routes/orders"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5001, () => console.log(`Server running on port 5001`))
  )
  .catch((err) => console.log(err));
