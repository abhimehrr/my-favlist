const jwt = require("jsonwebtoken");

const { secretStr } = require("./Secrets");
const User = require("../model/userModel");

// Check Login
const isLoggedin = (req, res, next) => {
  const authToken = req.headers.authtoken;

  if (!authToken) {
    return res.status(401).json({
      access: "denied",
      msg: "Auth token is required",
    });
  }

  const verify = verifyToken(authToken);

  if (!verify.err) {
    const _id = verify.auth.auth._id;
    const user = User.findById(_id);
    if (!user) {
      return res.status(401).json({
        access: "denied",
        msg: "Provide valid auth token",
      });
    }
    req.headers.uid = _id;
    next();
  } else {
    return res.status(403).json(verify);
  }
};

// Verify Login with Token
const verifyLogin = async (req, res) => {
  const authToken = req.headers.authtoken;

  if (!authToken) {
    return res.status(401).json({
      isLoggedIn: false,
    });
  }

  const verify = verifyToken(authToken);

  if (!verify.err) {
    const user = await User.findById(verify.auth.auth._id);
    if (!user) {
      return res.status(401).json({
        isLoggedIn: false,
      });
    }
    return res.status(200).json({
      isLoggedIn: true,
    });
  } else {
    return res.status(403).json({ isLoggedIn: false });
  }
};

// Verify TOken
const verifyToken = (token) => {
  try {
    var auth = jwt.verify(token, secretStr);

    if (auth.exp < Date.now()) {
      return {
        msg: "Token expired...",
        auth: null,
        err: "tokenExpired",
      };
    }

    return {
      msg: "Token is verified successfully...",
      auth,
      err: null,
    };
  } catch (error) {
    var e = JSON.parse(JSON.stringify(error));
    e.expiredAt = new Date(e.expiredAt).toLocaleString();

    return {
      msg: "Some error occured",
      auth: null,
      err: e,
    };
  }
};

module.exports = {
  isLoggedin,
  verifyLogin
};
