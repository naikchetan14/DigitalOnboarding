const express = require('express');
const { registerAdmin, loginAdmin, logout } = require('../controllers/userController.js');

const router = express.Router();

// Add a new hotel (Main Admin)
router.route("/admin/register").post(registerAdmin);
router.route('/admin/login').post(loginAdmin);
router.route('/admin/login').post(loginAdmin);
router.route('/admin/logout').get(logout);
module.exports=router;