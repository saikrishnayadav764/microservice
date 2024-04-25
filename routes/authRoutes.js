
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// POST /auth/register - Creating a new user account
router.post('/register', authController.register);

module.exports = router;
