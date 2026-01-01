/**
 * Airtel Money Webhook
 */

const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const { transactionStatus, payment, donation } = req.body;

  if (transactionStatus !== 'COMPLETED') return res.sendStatus(200);

  await paymentService.markConfirmed(payment);
  await donationService.markCompleted(donation);

  res.sendStatus(200);
};
