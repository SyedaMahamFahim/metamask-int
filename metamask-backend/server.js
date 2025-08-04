const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://bilalkhattak:bilal123@cluster0.9gilkcy.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import routes
const walletRoutes = require("./routes/wallet");

// Use routes
app.use("/api/wallet", walletRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({
    message: "MetaMask Backend API is running!",
    endpoints: {
      "POST /api/wallet/connect": "Save wallet address to database",
      "GET /api/wallet/addresses": "Get all saved wallet addresses",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(
    `🔗 Frontend can connect to: http://localhost:${PORT}/api/wallet`
  );
});
