// server/middleware/errorHandler.js
// Centralized error handling middleware for Express

function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler; 