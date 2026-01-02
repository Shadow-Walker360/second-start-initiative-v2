/**
 * Rate Limiter Middleware
 * ----------------------
 */

const rateLimit = require('express-rate-limit');

exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

exports.paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: 'Too many payment attempts. Try again later.',
});
