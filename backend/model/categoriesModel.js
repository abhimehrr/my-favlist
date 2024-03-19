const mongoose = require("mongoose");

module.exports = mongoose.model(
  "categories",
  new mongoose.Schema({
    name: String,
  })
);
