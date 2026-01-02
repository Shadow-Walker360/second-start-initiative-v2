/**
 * Sanitizer Utility
 * -----------------
 * Cleans user-provided input safely.
 */

exports.sanitizeString = (value) => {
  if (typeof value !== 'string') return value;

  return value
    .replace(/[<>]/g, '')
    .trim();
};

exports.sanitizeObject = (obj = {}) => {
  const clean = {};

  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      clean[key] = exports.sanitizeString(obj[key]);
    } else {
      clean[key] = obj[key];
    }
  }

  return clean;
};

/**
 * Input Sanitizer
 * ---------------
 */

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

module.exports = (app) => {
  app.use(mongoSanitize());
  app.use(xss());
};

