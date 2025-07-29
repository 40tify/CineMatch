// server/middleware/authMiddleware.js
// Middleware to protect routes by verifying JWT from httpOnly cookie

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get token from cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated. Please log in.' });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = authMiddleware; 