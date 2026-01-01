/**
 * Receipt Sender Job
 */

const Payment = require('../models/Payment');
const receiptService = require('../services/receipt.service');
const emailService = require('../services/payment-email.service');
const logger = require('../utils/logger');

module.exports = async () => {
  const payments = await Payment.find({
    status: 'CONFIRMED',
    receiptSent: { $ne: true },
  }).populate('donation');

  for (const payment of payments) {
    try {
      const receipt = receiptService.generateReceipt({
        donationId: payment.donation._id,
        paymentId: payment._id,
        donorName: payment.donation.name,
        donorEmail: payment.donation.email,
        amount: payment.amount,
        currency: payment.currency,
      });

      await emailService.sendPaymentSuccessEmail({
        to: payment.donation.email,
        donorName: payment.donation.name,
        amount: payment.amount,
        currency: payment.currency,
        receiptId: receipt.receiptId,
      });

      payment.receiptSent = true;
      await payment.save();
    } catch (err) {
      logger.error('Receipt sender failed', err);
    }
  }
};
