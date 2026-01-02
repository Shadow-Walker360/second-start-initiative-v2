/**
 * Bank Transfer Webhook
 * --------------------
 * Confirms bank transfer payments
 */

const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const { reference, confirmed } = req.body;

  if (!reference) {
    return res.sendStatus(400);
  }

  if (confirmed === true) {
    await paymentService.markConfirmed(reference);
    await donationService.markCompleted(reference);
  }

  res.sendStatus(200);
};
