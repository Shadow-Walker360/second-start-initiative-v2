/**
 * Crypto Webhook
 * --------------
 * Exchange-based confirmations
 */

const paymentService = require('../services/payment.service');

exports.handleWebhook = async (req, res) => {
  const { reference, txHash, confirmed } = req.body;

  if (!reference) return res.sendStatus(400);

  if (confirmed === true) {
    await paymentService.markConfirmed(reference, txHash);
  }

  res.sendStatus(200);
};
