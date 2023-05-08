require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");

// express app
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/products", productRoutes);

// connect to db
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
// listen for requests

app.listen(process.env.PORT, () => {
  console.log("connected to db and listening to port", process.env.PORT);
});
