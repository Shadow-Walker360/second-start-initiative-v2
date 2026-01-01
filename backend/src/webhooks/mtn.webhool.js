/**
 * MTN Webhook
 */

const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const { status, payment, donation } = req.body;

  if (status !== 'SUCCESSFUL') return res.sendStatus(200);

  await paymentService.markConfirmed(payment);
  await donationService.markCompleted(donation);

  res.sendStatus(200);
};
