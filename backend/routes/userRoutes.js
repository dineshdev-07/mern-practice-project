const express = require("express");
const {protect}  = require ('../middleware/authMiddleware')

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, getMe);

module.exports = router;
