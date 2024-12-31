const mongoose = require('mongoose');

// Define the schema for a Guest
const guestSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Hotel model
    ref: 'Hotel', // This will link the guest to a specific hotel
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  purposeOfVisit: {
    type: String,
    enum: ['Business', 'Personal', 'Tourist'], // Dropdown options
    required: true,
  },
  stayFrom: {
    type: Date,
    required: true,
  },
  stayTo: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensures no two guests have the same email
  },
  idProofNumber: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Create the model from the schema
const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
