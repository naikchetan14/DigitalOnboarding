const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt=require("jsonwebtoken");
// Define the schema for a User (Admin)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['mainAdmin', 'guestAdmin'],
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword =async function(password){
  return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, 'chetannbnxcnvxcnxnvcx');
};
// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
