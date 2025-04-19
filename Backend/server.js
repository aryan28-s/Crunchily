require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Crunchily", // Explicitly specify the database name
  })
  .then(() => console.log(`MongoDB Connected Crunchily to database`))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  bio: { type: String},
  phoneNumber: { type: String },
  cart: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  selectedBook: { // Add this field to store the selected book
    name: { type: String },
    price: { type: Number },
  },
});

// Use the existing "user" collection (lowercase)
const User = mongoose.model("User", UserSchema, "user");

// Signup Route
app.post("/signup", async (req, res) => {
  const { fullName, email, password, address, bio, phoneNumber } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ fullName, email, password: hashedPassword, address, bio, phoneNumber });

    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add to Cart Route
app.post("/add-to-cart", async (req, res) => {
  const { userId, item } = req.body;
  console.log("Adding to cart:", item); // Debugging
  console.log("User ID:", userId); // Debugging

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add the item (including price) to the cart
    user.cart.push(item);
    await user.save();

    console.log("Updated cart:", user.cart); // Debugging
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error); // Debugging
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
});

// Remove from Cart Route
app.post("/remove-from-cart", async (req, res) => {
  const { userId, itemId } = req.body;
  console.log("Removing from cart:", itemId); // Debugging
  console.log("User ID:", userId); // Debugging

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove the item from the cart
    user.cart = user.cart.filter((item) => item.id !== itemId);
    await user.save();

    console.log("Updated cart:", user.cart); // Debugging
    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing from cart:", error); // Debugging
    res.status(500).json({ message: "Error removing from cart", error: error.message });
  }
});

// Get Cart Items Route
app.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching cart for user:", userId); // Debugging

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Fetched cart:", user.cart); // Debugging
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error); // Debugging
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
});

// Store food Details Route
app.post("/store-book", async (req, res) => {
  const { userId, book } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Store the selected food in the user document
    user.selectedBook = {
      name: book.name,
      price: book.price,
    };
    await user.save();

    res.status(200).json({ message: "food details stored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error storing food details", error: error.message });
  }
});

// Get User Info Route
app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user info", error: error.message });
  }
});

// Get food Details Route
app.get("/get-book/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ book: user.selectedBook });
  } catch (error) {
    res.status(500).json({ message: "Error fetching food details", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));