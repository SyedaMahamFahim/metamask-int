const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    network: {
      type: String,
      default: "Unknown",
    },
    connectedAt: {
      type: Date,
      default: Date.now,
    },
    lastConnected: {
      type: Date,
      default: Date.now,
    },
    connectionCount: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
walletSchema.index({ address: 1 });
walletSchema.index({ connectedAt: -1 });

module.exports = mongoose.model("Wallet", walletSchema);
