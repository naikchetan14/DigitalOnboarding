const mongoose = require("mongoose");

const Hotel = require("../models/hotelModel");
const Guest = require("../models/guestModel");

exports.getAllhotels = async (req, res) => {
  try {
    const hotelList = await Hotel.find();
    return res.status(200).json({
      success: true,
      message: "Fetched successfully!",
      hotelList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Return the error message for debugging purposes
    });
  }
};
exports.guestListOfHotels = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    // Check if the provided hotelId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hotel ID format",
      });
    }
    const guestList = await Guest.find({ hotelId });
    return res.status(200).json({
      success: true,
      message: "Fetched successfully!",
      guestList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Return the error message for debugging purposes
    });
  }
};

exports.updateGuestDetails = async (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      address,
      purposeOfVisit,
      stayFrom,
      stayTo,
      email,
      idProofNumber,
    } = req.body;
    const guestId = req.params.guestId;

    if (!guestId) {
      return res.status(400).json({
        success: false,
        message: "Invalid hotel ID format",
      });
    }
    const updateFields = {};

    // Only add properties to updateFields if they are provided in the request body
    if (fullName) updateFields.fullName = fullName;
    if (mobileNumber) updateFields.mobileNumber = mobileNumber;
    if (address) updateFields.address = address;
    if (purposeOfVisit) updateFields.purposeOfVisit = purposeOfVisit;
    if (stayFrom) updateFields.stayFrom = stayFrom;
    if (stayTo) updateFields.stayTo = stayTo;
    if (email) updateFields.email = email;
    if (idProofNumber) updateFields.idProofNumber = idProofNumber;

    // If no fields to update, return an error
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update", // Return an error if no fields are provided for update
      });
    }

    // Find the guest by guestId and update the details
    const updatedGuest = await Guest.findByIdAndUpdate(guestId, updateFields, {
      new: true,
    });

    // If the guest is not found, return an error
    if (!updatedGuest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found", // Return error if guest is not found
      });
    }

    // Return the updated guest details
    return res.status(200).json({
      success: true,
      message: "Guest details updated successfully",
      guest: updatedGuest, // Return the updated guest details
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Return the error message for debugging purposes
    });
  }
};

exports.viewGuestDetails = async (req, res) => {
  try {
    const guestId = req.params.guestId;

    if (!guestId) {
      return res.status(400).json({
        success: false,
        message: "Guest ID is required",
      });
    }

    // Find the guest by ID
    const guest = await Guest.findById(guestId);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    // Return the guest details
    return res.status(200).json({
      success: true,
      guest, // Send guest details
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.deleteGuest = async (req, res) => {
  try {
    const guestId = req.params.guestId;

    if (!guestId) {
      return res.status(400).json({
        success: false,
        message: "Guest ID is required",
      });
    }

    // Find and delete the guest by ID
    const guest = await Guest.findByIdAndDelete(guestId);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Guest deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getAllGuestList = async (req, res) => {
  try {
    // Fetch all guests and populate the hotel data
    const guestListData = await Guest.find()
      .populate('hotelId', 'hotelName logo address') // Populate hotelId field with hotel details (hotelName, logo, address)

    // Respond with success message
    return res.status(200).json({
      success: true,
      guestListData,
    });

  } catch (error) {
    // Handle errors
    console.error("Error fetching guest list:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

