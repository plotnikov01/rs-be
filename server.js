require("dotenv").config();

const express = require("express");

const app = express();

app.listen(process.env.PORT, () => {
  console.log("Server is started on the port", process.env.PORT);
});
