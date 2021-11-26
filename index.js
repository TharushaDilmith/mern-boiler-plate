const express = require("express");
const app = express();
const mongoose = require("mongoose");

//connect to mongoose local database
mongoose
  .connect("mongodb://localhost/boiler-plate", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//listen on port 5000
app.listen(5000);
