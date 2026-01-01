/**
 * Bank Transfer Webhook
 */

const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const { confirmed, payment, donation } = req.body;

  if (!confirmed) return res.sendStatus(200);

  await paymentService.markConfirmed(payment);
  await donationService.markCompleted(donation);

  res.sendStatus(200);
};
