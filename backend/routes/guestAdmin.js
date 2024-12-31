const express = require("express");
const {
  getAllhotels,
  guestListOfHotels,
  updateGuestDetails,
  viewGuestDetails,
  deleteGuest,
  getAllGuestList,
} = require("../controllers/guestAdmin");
const authenticate = require("../middlewares/auth");
const {
  authorizeRolesForGuestAdmin,
  accessForEveryAdmin,
} = require("../middlewares/authRoles");
const router = express.Router();

router
  .route("/all/hotels")
  .get(
    getAllhotels
  );

router
  .route("/all/guest")
  .get(
    authenticate,
    getAllGuestList
  );

router
  .route("/guest/:hotelId")
  .get(
    authenticate,
    authorizeRolesForGuestAdmin(["guestAdmin"]),
    guestListOfHotels
  );
router
  .route("/update/guest/:guestId")
  .put(
    authenticate,
    authorizeRolesForGuestAdmin(["guestAdmin"]),
    updateGuestDetails
  );
router
  .route("/view/guest/:guestId")
  .get(
    authenticate,
    authorizeRolesForGuestAdmin(["guestAdmin"]),
    viewGuestDetails
  );
router
  .route("/delete/guest/:guestId")
  .delete(
    authenticate,
    authorizeRolesForGuestAdmin(["guestAdmin"]),
    deleteGuest
  );

module.exports = router;
