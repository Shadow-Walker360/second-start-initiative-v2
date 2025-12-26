/**
 * Global Error Middleware
 * -----------------------
 * Final error handler for the application.
 */

const env = require('../config/env');

module.exports = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    error: err.message || 'Internal server error',
  };

  if (!env.isProduction) {
    response.stack = err.stack;
  }

  // Log error (production systems would forward this)
  console.error({
    method: req.method,
    path: req.originalUrl,
    statusCode,
    error: err.message,
  });

  res.status(statusCode).json(response);
};
