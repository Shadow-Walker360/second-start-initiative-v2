/**
 * Webhook Routes
 * --------------
 * Handles incoming payment provider callbacks.
 * Webhooks are NOT versioned.
 */

const express = require('express');
const router = express.Router();

/* ===========================
   RAW BODY PARSER
   =========================== */
/**
 * IMPORTANT:
 * Webhooks REQUIRE raw body for signature verification.
 * Do NOT use JSON middleware here.
 */
router.use(
  express.raw({ type: '*/*' })
);

/* ===========================
   CONTROLLERS
   =========================== */
const webhookController = require('../controllers/webhook.controller');

/* ===========================
   PROVIDER WEBHOOK ENDPOINTS
   =========================== */

/**
 * Card payments (Stripe / Flutterwave / Paystack)
 */
router.post(
  '/card',
  webhookController.handleCardWebhook
);

/**
 * Mobile money (M-Pesa, Airtel, MTN)
 */
router.post(
  '/mobile-money',
  webhookController.handleMobileMoneyWebhook
);

/**
 * PayPal
 */
router.post(
  '/paypal',
  webhookController.handlePaypalWebhook
);

/**
 * Crypto providers (on-chain confirmations)
 */
router.post(
  '/crypto',
  webhookController.handleCryptoWebhook
);

/**
 * Bank transfer notifications
 */
router.post(
  '/bank',
  webhookController.handleBankWebhook
);

module.exports = router;
