const mongoose = require("mongoose");

exports.connectToDataBase = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017/DigitalGuestOnBoarding');
      console.log("Connected");
  } catch (error) {
    console.log(error.message);
  }
};
