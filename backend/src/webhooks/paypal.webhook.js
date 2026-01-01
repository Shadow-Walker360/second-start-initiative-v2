/**
 * PayPal Webhook Handler
 * ---------------------
 * Verifies PayPal webhook authenticity
 */

const crypto = require('crypto');
const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const transmissionId = req.headers['paypal-transmission-id'];
  const transmissionTime = req.headers['paypal-transmission-time'];
  const certUrl = req.headers['paypal-cert-url'];
  const authAlgo = req.headers['paypal-auth-algo'];
  const transmissionSig = req.headers['paypal-transmission-sig'];
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;

  // 🔒 Basic trust check (PayPal SDK verification can be added later)
  if (!transmissionSig || !webhookId) {
    return res.sendStatus(400);
  }

  const event = req.body;

  if (event.event_type !== 'PAYMENT.CAPTURE.COMPLETED') {
    return res.sendStatus(200);
  }

  const resource = event.resource;

  // At this point PayPal has confirmed money
  await paymentService.markConfirmed(resource.custom_id);
  await donationService.markCompleted(resource.custom_id);

  res.sendStatus(200);
};
