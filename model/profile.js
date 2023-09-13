// models/profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  fullName: String,
  email: String,
  phoneNumber: String,
  address: String,
});

module.exports = mongoose.model('Profile', profileSchema);
