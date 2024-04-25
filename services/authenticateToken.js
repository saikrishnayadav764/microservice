const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// Middleware function to authenticate JWT token and check if user exists
async function authenticateToken(req, res, next) {
  // Extracting JWT token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  // If token is not provided, returning 401 Unauthorized
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verifying JWT token
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      // If token verification fails, return 403 Forbidden
      return res.status(403).json({ error: 'Forbidden' });
    }

    try {
      // Checking if user exists in the database
      const existingUser = await User.findByPk(user.userId);
      if (!existingUser) {
        // If user does not exist, return 404 Not Found
        return res.status(404).json({ error: 'Forbidden Token' });
      }
      
      // If user exists, attaching the user object to the request and proceeding to the next middleware
      req.user = user;
      req.userId = user.userId;
      next();
    } catch (error) {
      // If an error occurs during database query, returning 500 Internal Server Error
      console.error('Error checking user existence:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}

module.exports = { authenticateToken };
