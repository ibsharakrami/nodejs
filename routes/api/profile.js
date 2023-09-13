// routes/api/profile.js
const express = require('express');
const router = express.Router();
const Profile = require('../../model/profile');
const mongoose = require('mongoose');

// Get user profile by user ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('userId:', userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    const profile = await Profile.findOne({ userId }).exec();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile by user ID
router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    const { fullName, email, phoneNumber, address } = req.body;
    const updatedProfile = {
      fullName,
      email,
      phoneNumber,
      address,
    };

    const profile = await Profile.findOneAndUpdate(
      { userId },
      updatedProfile,
      { new: true }
    ).exec();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
