/**
 * Crypto Utilities
 * ----------------
 * Safe helpers for crypto payment flows.
 */

const crypto = require('crypto');

exports.generateHash = (value) => {
  return crypto
    .createHash('sha256')
    .update(String(value))
    .digest('hex');
};

exports.generateSecureToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};
