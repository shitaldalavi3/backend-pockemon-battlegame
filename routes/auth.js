const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Registration routes
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed try Again" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed try Again" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed try Again" });
  }
});
