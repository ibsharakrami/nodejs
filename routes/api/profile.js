// routes/profile.js
const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profileController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const verifyJWT = require('../../middleware/verifyJWT');

// Protected route to update user profile
router.post('/update-profile', verifyJWT, profileController.updateUserProfile);

// Protected route to get user profile data
router.get('/user-profile', verifyJWT, profileController.getUserProfile);

module.exports = router;
