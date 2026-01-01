/**
 * Reconciliation Job
 */

const Payment = require('../models/Payment');
const logger = require('../utils/logger');

module.exports = async () => {
  const stuckPayments = await Payment.find({
    status: 'PROCESSING',
    createdAt: { $lt: new Date(Date.now() - 1000 * 60 * 30) }, // 30 mins
  });

  for (const payment of stuckPayments) {
    try {
      payment.status = 'FAILED';
      payment.metadata.failureReason = 'Timeout during processing';
      await payment.save();
    } catch (err) {
      logger.error('Reconciliation error', err);
    }
  }
};
