const mongoose = require("mongoose");

module.exports = mongoose.model(
  "myfavs",
  new mongoose.Schema({
    name: String,
    itemId: String, 
    uid: String
  })
);
