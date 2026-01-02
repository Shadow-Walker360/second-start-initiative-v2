/**
 * Airtel Money Webhook
 * -------------------
 * Payment confirmation handler
 */

const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const { status, transaction } = req.body;

  if (!transaction?.id) {
    return res.sendStatus(400);
  }

  if (status === 'SUCCESS') {
    await paymentService.markConfirmed(transaction.id);
    await donationService.markCompleted(transaction.id);
  }

  if (status === 'FAILED') {
    await paymentService.markFailed(transaction.id, 'Airtel payment failed');
  }

  res.sendStatus(200);
};
