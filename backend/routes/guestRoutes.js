const express = require("express");
const { addGuestHotelDetails } = require("../controllers/guestControllers");
const authenticate = require("../middlewares/auth");
const { accessForEveryAdmin } = require("../middlewares/authRoles");
const router = express.Router();

router
  .route("/guest/hoteldetails")
  .post(authenticate, accessForEveryAdmin(['mainAdmin','guestAdmin']), addGuestHotelDetails);

module.exports = router;
