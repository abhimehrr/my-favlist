const mongoose = require("mongoose");

// Define a schema for the user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  otp: Number,
  isVerified: Boolean
});

// Create User model from the schema
module.exports = mongoose.model("users", userSchema);