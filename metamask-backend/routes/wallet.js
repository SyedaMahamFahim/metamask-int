const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet");

// POST /api/wallet/connect - Save wallet address to database
router.post("/connect", async (req, res) => {
  try {
    const { address, network = "Unknown" } = req.body;

    // Validate address
    if (!address) {
      return res.status(400).json({
        success: false,
        error: "Wallet address is required",
      });
    }

    // Check if address is valid Ethereum address format
    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethereumAddressRegex.test(address)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Ethereum address format",
      });
    }

    // Check if wallet already exists
    let wallet = await Wallet.findOne({ address: address.toLowerCase() });

    if (wallet) {
      // Update existing wallet
      wallet.lastConnected = new Date();
      wallet.connectionCount += 1;
      wallet.network = network;
      wallet.isActive = true;
      await wallet.save();

      return res.status(200).json({
        success: true,
        message: "Wallet reconnected successfully",
        data: {
          address: wallet.address,
          network: wallet.network,
          connectionCount: wallet.connectionCount,
          lastConnected: wallet.lastConnected,
        },
      });
    } else {
      // Create new wallet
      wallet = new Wallet({
        address: address.toLowerCase(),
        network: network,
      });
      await wallet.save();

      return res.status(201).json({
        success: true,
        message: "Wallet connected successfully",
        data: {
          address: wallet.address,
          network: wallet.network,
          connectionCount: wallet.connectionCount,
          connectedAt: wallet.connectedAt,
        },
      });
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    res.status(500).json({
      success: false,
      error: "Failed to connect wallet",
      message: error.message,
    });
  }
});

// GET /api/wallet/addresses - Get all saved wallet addresses
router.get("/addresses", async (req, res) => {
  try {
    const wallets = await Wallet.find({ isActive: true })
      .sort({ lastConnected: -1 })
      .select("address network connectedAt lastConnected connectionCount");

    res.status(200).json({
      success: true,
      count: wallets.length,
      data: wallets,
    });
  } catch (error) {
    console.error("Error fetching wallets:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch wallet addresses",
      message: error.message,
    });
  }
});

// GET /api/wallet/address/:address - Get specific wallet by address
router.get("/address/:address", async (req, res) => {
  try {
    const { address } = req.params;

    const wallet = await Wallet.findOne({
      address: address.toLowerCase(),
      isActive: true,
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: "Wallet not found",
      });
    }

    res.status(200).json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch wallet",
      message: error.message,
    });
  }
});

// DELETE /api/wallet/address/:address - Deactivate wallet (soft delete)
router.delete("/address/:address", async (req, res) => {
  try {
    const { address } = req.params;

    const wallet = await Wallet.findOneAndUpdate(
      { address: address.toLowerCase() },
      { isActive: false },
      { new: true }
    );

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: "Wallet not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wallet deactivated successfully",
      data: {
        address: wallet.address,
        isActive: wallet.isActive,
      },
    });
  } catch (error) {
    console.error("Error deactivating wallet:", error);
    res.status(500).json({
      success: false,
      error: "Failed to deactivate wallet",
      message: error.message,
    });
  }
});

module.exports = router;
