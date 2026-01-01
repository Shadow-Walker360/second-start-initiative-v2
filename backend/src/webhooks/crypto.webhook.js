/**
 * Crypto Webhook
 */

const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const { txConfirmed, payment, donation } = req.body;

  if (!txConfirmed) return res.sendStatus(200);

  await paymentService.markConfirmed(payment);
  await donationService.markCompleted(donation);

  res.sendStatus(200);
};
