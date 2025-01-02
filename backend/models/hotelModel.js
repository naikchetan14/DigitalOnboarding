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
      public_id: {
        type: String,
        required: [true, "Hotel Image is required!"],
      },
      url: {
        type: String,
        required: [true, "Hotel Image is required!"],
      },
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
