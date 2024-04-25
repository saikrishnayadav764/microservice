// authService.js

const jwt = require('jsonwebtoken');

// Secret key used to sign the JWT token
// const JWT_SECRET = 'secret_key'; // Replacing with your actual secret key

// Generating a JWT token
const generateJWT = (userId, username) => {
  // Creating the payload
  const payload = {
    userId,
    username
  };

  // Signing the payload and return the JWT token
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }); 
};

module.exports = { generateJWT };
