const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authService = require('../services/authService');

// User login
async function login(req, res){
  try {
    const { username, password } = req.body;

    // Finding the user by username
    const user = await User.findOne({ where: { username } });

    // If user does not exist, returning error
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Checking if the password is correct
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If Password is correct, generating JWT token and return it
    const token = authService.generateJWT(user.id, user.username);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Creating a new user account
async function register(req, res){
  try {
    const { username, password, role } = req.body;

    // Checking if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Creating the new user account
    const newUser = await User.create({ username, password, role });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { login, register };
