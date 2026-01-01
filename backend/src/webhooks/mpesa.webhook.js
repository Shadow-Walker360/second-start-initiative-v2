/**
 * M-PESA Webhook
 * -------------
 * Safaricom payment confirmation
 */

const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const callback = req.body?.Body?.stkCallback;

  if (!callback) {
    return res.sendStatus(400);
  }

  const {
    ResultCode,
    CheckoutRequestID,
    CallbackMetadata,
  } = callback;

  // Non-zero = failed
  if (ResultCode !== 0) {
    await paymentService.markFailed(CheckoutRequestID, 'M-PESA failed');
    return res.sendStatus(200);
  }

  // Payment confirmed
  await paymentService.markConfirmed(CheckoutRequestID);
  await donationService.markCompleted(CheckoutRequestID);

  res.sendStatus(200);
};
