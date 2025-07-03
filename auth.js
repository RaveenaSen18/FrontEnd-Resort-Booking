const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidation, loginValidation, profileUpdateValidation } = require('../middleware/validate');
const auth = require('../middleware/auth');

// Register route
router.post('/register', registerValidation, userController.register);

// Login route
router.post('/login', loginValidation, userController.login);

// Get user profile (protected route)
router.get('/profile', auth, userController.getProfile);

// Update user profile (protected route)
router.put('/profile', auth, profileUpdateValidation, userController.updateProfile);

module.exports = router; 