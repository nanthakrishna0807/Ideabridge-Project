const express = require("express");
const router = express.Router();
const { registerUser, authUser, getUserProfile, socialAuth } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", authUser);

// Social authentication
router.post("/social-auth", socialAuth);

// Get user profile (Protected route)
router.get("/profile", protect, getUserProfile);

module.exports = router;