/**
 * Crypto Watcher Job
 */

const Payment = require('../models/Payment');
const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');
const logger = require('../utils/logger');

module.exports = async () => {
  const pending = await Payment.find({
    method: 'CRYPTO',
    status: 'PENDING_CONFIRMATION',
  });

  for (const payment of pending) {
    try {
      // In real life: check blockchain explorer
      const confirmed = true;

      if (confirmed) {
        await paymentService.markConfirmed(payment);
        await donationService.markCompleted(payment.donation);
      }
    } catch (err) {
      logger.error('Crypto watcher error', err);
    }
  }
};
