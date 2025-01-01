const mongoose = require('mongoose');
const QRCode = require("qrcode");
const Guest = require("../models/guestModel.js");

const url = `http://localhost:5173`;

exports.addGuestHotelDetails = async (req, res) => {
try {

    const { fullName,mobileNumber,address,purposeOfVisit,stayFrom,stayTo,email,idProofNumber,hotelId}=req.body;

    if(!fullName || !mobileNumber || !address || !purposeOfVisit || !stayFrom || !stayTo || !email || !idProofNumber){
        return res.status(400).json({
            success: false,
            message: "Please fill in all the details",
          });
    }

    const newGuest = await Guest.create({
        fullName,
        mobileNumber,
        address,
        purposeOfVisit,
        stayFrom,
        stayTo,
        email,
        idProofNumber,
        hotelId,
      });
  
      await newGuest.save();
  
      return res.status(201).json({
        success: true,
        message: 'Guest details submitted successfully!',
        guest: newGuest,
      });
} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message, // Return the error message for debugging purposes
      });
}
}