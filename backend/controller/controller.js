const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Modes
const User = require("../model/userModel");
const Categories = require("../model/categoriesModel");
const MyFav = require("../model/myFavModel");

// Send Mail
const sendMail = require("../controller/SendMail");

// Secrets
const { secretStr } = require("../auth/Secrets");

// Register
const register = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      err: true,
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        err: true,
        msg: "Email already exists",
      });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    otp = getOTP(8);

    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      otp,
      isVerified: false,
    });

    // Send OTP to user
    sendMail(
      "OTP for verification!",
      email,
      `
        <p>Dear ${name}, verify your account</p>
        <hr>
        <h1>OTP : ${otp}</h1>
        <hr>
        <p>Date : ${Date()}</p>
        <hr>
    `
    );

    // Save the user to the database
    await newUser.save();

    // Send success response
    return res.status(201).json({
      err: false,
      msg: "User registered successfully",
    });
  } catch (err) {
    var error = JSON.parse(JSON.stringify(err.errors));
    console.error(error);

    return res.status(500).json({
      err: true,
      msg: err.message,
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      err: true,
      msg: "User not found...",
    });
  }

  if (user.isVerified) {
    return res.status(200).json({
      err: false,
      msg: "Account already verified",
    });
  }

  if (user.otp != otp) {
    return res.status(401).json({
      err: true,
      msg: "Incorrect OTP",
    });
  }

  await User.updateOne(
    { email },
    {
      $set: {
        otp: "",
        isVerified: true,
      },
    }
  );
  return res.status(200).json({
    err: false,
    msg: "Account verified",
  });
};

// Login
const login = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      err: true,
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        err: true,
        access: "denied",
        msg: "Invalid credentials",
      });
    }

    // Check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        err: true,
        access: "denied",
        msg: "Invalid credentials",
      });
    }
    
    if (!user.isVerified) {
      return res.status(400).json({
        err: true,
        access: "denied",
        msg: "Account is not verified",
      });
    }

    return res.status(200).json({
      err: false,
      access: "allowed",
      msg: "Login successfull",
      authtoken: signToken({
        _id: user._id,
      }),
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      err: true,
      msg: "Server Error",
    });
  }
};


// Fetch All Category
const fetchCategories = async (req, res) => {
  // Get user id
  const { uid } = req.headers;

  // Fetch Categores and User saved categories
  const categories = await Categories.find();
  const myFavList = await MyFav.find({ uid });

  // Filter the items
  const items = uniqueItems(myFavList, categories);

  return res.status(200).json({
    msg: "Fetched successfully",
    items,
  });
};

// Add to Favorite List
const addToFav = async (req, res) => {
  const { item, itemId } = req.body;

  const fav = new MyFav({
    name: item,
    itemId,
    uid: req.headers.uid,
  });
  await fav.save();
  return res.status(200).json({
    msg: "Saved successfully...",
  });
};
// Add to Favorite List
const removeFromFav = async (req, res) => {
  const { itemId } = req.body;
  const { uid } = req.headers;

  const response = await MyFav.find({ uid });
  if (!response) {
    return res.status(200).json({
      msg: "Data not found...",
    });
  }

  const filtered = response?.filter((item) => item.itemId === itemId);
  if (filtered.length < 1) {
    return res.status(200).json({
      msg: "Data not found...",
    });
  }

  await MyFav.deleteOne({ _id: filtered[0]._id });

  return res.status(200).json({
    msg: "Item removed successfully...",
  });
};

// Sign Token
const signToken = (auth) => {
  return jwt.sign(
    {
      auth,
      iat: Date.now(),
      exp: Date.now() + 1000 * 60 * 60 * 24,
    },
    secretStr
  );
};

// Generate OTP
const getOTP = (len = 4) => {
  var numbers = "0123456789";
  var otp = "";
  for (var i = 0; i < len; i++) {
    otp += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return otp;
};

// Merge and Find Unique
const uniqueItems = (a, b) => {
  const mergedArray = [...a, ...b];

  const ui = mergedArray.reduce((acc, current) => {
    const existingItemIndex = acc.findIndex(
      (item) => item.name === current.name
    );

    const temp = {
      name: current.name,
      itemId: current?.itemId || current.id,
      isFav: false,
    };

    if (existingItemIndex !== -1) {
      acc[existingItemIndex].isFav = true;
    } else {
      acc.push(temp);
    }
    return acc;
  }, []);

  return ui;
};

module.exports = {
  register,
  verifyOTP,
  login,
  fetchCategories,
  addToFav,
  removeFromFav,
};
