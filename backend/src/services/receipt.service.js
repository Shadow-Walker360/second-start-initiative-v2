/**
 * Receipt Service
 * ---------------
 * Generates immutable donation receipts.
 */

const crypto = require('crypto');
const logger = require('../utils/logger');

exports.generateReceipt = ({
  donationId,
  paymentId,
  donorName,
  donorEmail,
  amount,
  currency,
}) => {
  const receiptId = `RCT-${crypto
    .randomBytes(6)
    .toString('hex')
    .toUpperCase()}`;

  const receipt = Object.freeze({
    receiptId,
    donationId,
    paymentId,
    donorName: donorName || 'Anonymous',
    donorEmail: donorEmail || null,
    amount,
    currency,
    issuedAt: new Date().toISOString(),
    issuer: 'Second Start Initiative',
  });

  logger.info('Receipt generated', {
    receiptId,
    donationId,
  });

  return receipt;
};
