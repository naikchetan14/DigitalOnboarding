const mongoose = require("mongoose");
const User = require("../models/userModel");

exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log("name email password", username, email, password);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    user = await User.create({
      username,
      email,
      password,
      role,
    });

    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,  // Use 'true' only for HTTPS
      sameSite: 'Strict', // Prevents CSRF attacks
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
      message:'Register Successfully!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Return the error message for debugging purposes
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        succes: false,
        message: "Invalid credientials",
      });
    }

    const token = await user.generateToken();
  
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,  // Use 'true' only for HTTPS
      sameSite: 'Strict', // Prevents CSRF attacks
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
      message:'Login Successfully!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Return the error message for debugging purposes
    });
  }
};


exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};