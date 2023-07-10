const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the required fields are added or not
    if (!username || !password) {
      return res
        .status(400)
        .json({err:"Please fill all required fields" });
    }

    // Check if a user with the same username already exists
    const existingUsername = await User.findOne({ username});
    if (existingUsername) {
      return res.status(409).json({err: "User already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate and return the JWT token after sign up
    const user = await User.findOne({ username });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 600,
    });
    res.status(201).json({
      message: "User registered successfully",
      username: user.username,
      token,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the required fields are provided
    if (!username|| !password) {
      return res
        .status(400)
        .json({ err:"Please provide username and password" });
    }

    // Find the user by email
    const user = await User.findOne({ username});
    if (!user) {
      return res.status(401).json({ err:"Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ err:"Invalid username or password" });
    }

    // Generate and return the JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 600,
    });
    res
      .status(200)
      .json({ message: "Login successful", username: user.username, token });
  } catch (error) {
    res.status(500).json({ err: "Failed to login" });
  }
};