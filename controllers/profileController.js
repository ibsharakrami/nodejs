const Profile = require('../model/profile');

// Create or update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { phoneNumber, address } = req.body;
    let profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = new Profile({ userId: req.user.id, phoneNumber, address });
    } else {
      profile.phoneNumber = phoneNumber;
      profile.address = address;
    }

    await profile.save();
    res.status(201).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

// Get user profile data
const getUserProfile = async (req, res) => {
  try {
    console.log("req==>",req.id)
    const userId = req.id; // Assuming you have the user ID in the JWT payload
    console.log("User ID:", userId); // Log the user ID
    const userProfile = await Profile.findOne({ userId });

    if (!userProfile) {
      console.log("User profile not found for ID:", userId); // Log if the profile is not found
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = { updateUserProfile, getUserProfile };


// const Profile = require('../model/profile');
// const User = require("../model/user");

// // Create or update user profile
// const updateUserProfile = async (req, res) => {
//   try {
//     const { phoneNumber, address } = req.body;
//     let profile = await Profile.findOne({ userId: req.userId });

//     if (!profile) {
//       profile = new Profile({ userId: req.userId, phoneNumber, address });
//     } else {
//       profile.phoneNumber = phoneNumber;
//       profile.address = address;
//     }

//     await profile.save();
//     res.status(201).json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update profile' });
//   }
// }

// // Get user profile data
// const  getUserProfile = async (req, res) => {
//   console.log("Ress==>",res.user)
//   try {
//     const userId = req.user.id; // Assuming you have the user ID in the JWT payload
//     const userProfile = await Profile.findOne({ user: userId });

//     if (!userProfile) {
//       return res.status(404).json({ message: 'User profile not found' });
//     }

//     res.json(userProfile);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }

// module.exports = { updateUserProfile, getUserProfile };
