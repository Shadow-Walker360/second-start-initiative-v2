/**
 * MTN Mobile Money Webhook
 * -----------------------
 * Payment confirmation handler
 */

const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const { status, referenceId } = req.body;

  if (!referenceId) {
    return res.sendStatus(400);
  }

  if (status === 'SUCCESSFUL') {
    await paymentService.markConfirmed(referenceId);
    await donationService.markCompleted(referenceId);
  }

  if (status === 'FAILED') {
    await paymentService.markFailed(referenceId, 'MTN payment failed');
  }

  res.sendStatus(200);
};
