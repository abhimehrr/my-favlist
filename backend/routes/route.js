const express = require("express");
const Router = express.Router();
const { body } = require("express-validator");

// Controller
const {
  register,
  login,
  fetchCategories,
  addToFav,
  removeFromFav,
  verifyOTP,
} = require("../controller/controller");

const { isLoggedin, verifyLogin } = require("../auth/isLogin");

// Register
Router.post(
  "/register",
  [
    // Validate name
    body("name")
      .isString()
      .isLength({ min: 4 })
      .withMessage("Name should be atleast 4 character long"),

    // Validate email
    body("email")
      .isEmail()
      .withMessage("Enter a valid email")
      .isLength({ min: 8 })
      .withMessage("Name should be atleast 8 character long"),

    // Password email
    body("password")
      .notEmpty()
      .withMessage("Enter a strong password")
      .isLength({ min: 6 })
      .withMessage("Password should be atleast 6 character long"),
  ],
  register
);

// Verify OTP
Router.post("/verify-otp", verifyOTP);

// Verify Login with Token
Router.post("/verify-login", verifyLogin);


// Login
Router.post(
  "/login",
  [
    // Validate email
    body("email").isEmail().withMessage("Please enter a valid email"),
    // Validate password
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

// Fetch All Categores
Router.post("/get-categories", isLoggedin, fetchCategories);

// Add to Favorite List
Router.post("/add-to-fav", isLoggedin, addToFav);

// Delete from Favorite List
Router.post("/delete-from-fav", isLoggedin, removeFromFav);

module.exports = Router;
