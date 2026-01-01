/**
 * Card Webhook
 * ------------
 * Trusted payment confirmation
 */

const stripe = require('../payments/card.client');
const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;

    await paymentService.markConfirmed(intent.id);
    await donationService.markCompleted(intent.metadata.donationId);
  }

  if (event.type === 'payment_intent.payment_failed') {
    const intent = event.data.object;
    await paymentService.markFailed(intent.id, 'Card payment failed');
  }

  res.sendStatus(200);
};
