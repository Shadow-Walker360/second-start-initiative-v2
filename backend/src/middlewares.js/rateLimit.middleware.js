/**
 * Rate Limit Middleware
 * ---------------------
 * Applies request rate limiting per IP.
 */

const rateLimit = require('express-rate-limit');
const security = require('../config/security');

exports.publicLimiter = rateLimit({
  windowMs: security.rateLimit.windowMs,
  max: security.rateLimit.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests, please slow down',
  },
});

exports.strictLimiter = rateLimit({
  windowMs: security.rateLimit.windowMs,
  max: Math.floor(security.rateLimit.maxRequests / 4),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many attempts, please try again later',
  },
});
