const express = require("express");
const Hotel = require("../models/hotelModel.js"); // Hotel model
const { addNewHotel, deleteHotel } = require("../controllers/hotel.js");
const authenticate = require("../middlewares/auth.js");
const { authorizeRolesForMainAdmin } = require("../middlewares/authRoles.js");
const router = express.Router();

// Add a new hotel (Main Admin)
router
  .route("/add/hotel")
  .post(authenticate, authorizeRolesForMainAdmin(["mainAdmin"]), addNewHotel);
router
  .route("/delete/:id")
  .delete(authenticate, authorizeRolesForMainAdmin(["mainAdmin"]), deleteHotel);

module.exports = router;
