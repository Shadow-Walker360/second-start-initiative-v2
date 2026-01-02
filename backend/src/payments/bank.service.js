/**
 * Bank Transfer Service
 * ---------------------
 * Generates transfer instructions
 */

const crypto = require('crypto');
const bankDetails = require('../constants/bank.constants');

exports.initiatePayment = async ({ amount, currency }) => {
  const reference = `BNK-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

  return {
    status: 'pending',
    providerReference: reference,
    instructions: {
      ...bankDetails,
      AMOUNT: amount,
      CURRENCY: currency,
      REFERENCE: reference,
      NOTE: 'Use the reference exactly as shown',
    },
  };
};
