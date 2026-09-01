const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jsontoken = require("jsonwebtoken");
const User = require("../models/usermodel");

// @desc  register the user
// @method POST /api/user/register

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Fill the All fields");
  }

  // User Already Exists
  const userExists = await User.find({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Already User Exists");
  }

  // Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      Name: user.name,
      Email: user.email,
      Token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Err");
  }
});

// @desc  Authenticate the user
// @method POST /api/user/login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      Name: user.name,
      Email: user.email,
      Token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Err");
  }
});

// @desc  Read the user
// @method GET /api/user
// @access Private

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate Token

const generateToken = (id) => {
  return jsontoken.sign({ id }, process.env.JWT, {
    expiresIn: "20d",
  });
};

module.exports = { registerUser, loginUser, getMe };
