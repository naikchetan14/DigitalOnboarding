const mongoose = require("mongoose");

// Define the schema for a Hotel
const hotelSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String, // This will store the URL or path to the logo image file
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    qrCode: {
      type: String, // This will store the URL of the generated QR code
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create the model from the schema
const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
