const express = require("express");
const { addGuestHotelDetails } = require("../controllers/guestControllers");
const authenticate = require("../middlewares/auth");
const { accessForEveryAdmin } = require("../middlewares/authRoles");
const router = express.Router();

router
  .route("/guest/hoteldetails")
  .post(accessForEveryAdmin(['guestAdmin',"Guest"]), addGuestHotelDetails);

module.exports = router;
