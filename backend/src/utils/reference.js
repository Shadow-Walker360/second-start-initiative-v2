/**
 * Reference Utility
 * -----------------
 * Generates unique, traceable references for payments and transactions.
 */

const crypto = require('crypto');

/**
 * Generate a unique payment reference
 * @param {string} prefix - Reference prefix (e.g. DON, PAY, BNK)
 * @returns {string}
 */
exports.generateReference = (prefix = 'REF') => {
  const timestamp = Date.now().toString(36); // time-based trace
  const random = crypto.randomBytes(5).toString('hex'); // entropy

  return `${prefix}-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate an idempotency key
 * Used to prevent duplicate payment creation
 */
exports.generateIdempotencyKey = () => {
  return crypto.randomBytes(16).toString('hex');
};
