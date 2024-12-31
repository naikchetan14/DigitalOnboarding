const mongoose = require('mongoose');
const QRCode = require("qrcode");
const Hotel = require("../models/hotelModel");

const url = `http://localhost:5173/`;

exports.addNewHotel = async (req, res) => {
    try {
      const { hotelName, logo, address } = req.body;
      console.log('Entered addNewHotel function',hotelName,logo,address);
  
      if (!hotelName || !logo || !address) {
        return res.status(400).json({
          success: false,
          message: "Please fill in all the details",
        });
      }
  
      console.log('Creating new hotel');
  
      // Step 1: Create the hotel without the QR code
      const newHotel = await Hotel.create({
        hotelName,
        logo,
        address,
        qrCode:'static code'
      });
  
      console.log('Hotel created:', newHotel);
  
      // Step 2: Generate the hotel-specific landing page URL using hotelId
      const hotelLandingPageUrl = `${url}/hotel/${newHotel._id}`;
  
      // Step 3: Generate QR Code for the landing page
      const qrCode = await QRCode.toDataURL(hotelLandingPageUrl);
      console.log('QR Code generated');
  
      // Step 4: Update the hotel document with the generated QR code
      newHotel.qrCode = qrCode;
      await newHotel.save();
  
      console.log('Hotel updated with QR code:', newHotel);
  
      // Respond with the newly added hotel data
      return res.status(201).json({
        success: true,
        message: "Hotel added successfully!",
        hotel: newHotel, // Return hotel data along with the QR code
      });
    } catch (error) {
      console.error('Error occurred:', error.message);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message, // Return the error message for debugging purposes
      });
    }
  };

  exports.deleteHotel = async (req, res) => {
    try {
      const hotelId = req.params.id;
  
      // Debugging: Log the hotelId to see what you're receiving
      console.log("Received hotelId:", hotelId);
  
      // Check if the provided hotelId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(hotelId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid hotel ID format",
        });
      }
  
      // Attempt to delete the hotel by its _id
      const isDeleted = await Hotel.findByIdAndDelete(hotelId);
  
      if (!isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Hotel not found with the provided ID",
        });
      }
  
      // Respond with a success message
      return res.status(200).json({
        success: true,
        message: "Hotel deleted successfully",
      });
    } catch (error) {
      console.log("Error:", error); // Log any unexpected errors
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
