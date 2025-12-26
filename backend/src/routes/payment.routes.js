/**
 * Payment Routes
 * --------------
 * Initiates payments for an existing donation.
 */

const express = require('express');
const router = express.Router();

/* ===========================
   MIDDLEWARES
   =========================== */
const authenticate = require('../middlewares/auth.middleware');

/* ===========================
   CONTROLLERS
   =========================== */
const paymentController = require('../controllers/payment.controller');

/* ===========================
   INITIATE PAYMENT
   =========================== */
/**
 * Starts a payment process for a donation.
 * Provider logic is resolved internally.
 */
router.post(
  '/initiate',
  paymentController.initiatePayment
);

/* ===========================
   PAYMENT STATUS
   =========================== */
/**
 * Returns real-time payment status.
 */
router.get(
  '/:paymentId/status',
  paymentController.getPaymentStatus
);

/* ===========================
   MANUAL BANK TRANSFER NOTICE
   =========================== */
/**
 * User submits proof/reference for bank transfer.
 */
router.post(
  '/bank/notify',
  paymentController.notifyBankTransfer
);

/* ===========================
   CRYPTO WALLET INTENT
   =========================== */
/**
 * Returns crypto address & amount for wallet payments.
 */
router.post(
  '/crypto/address',
  paymentController.generateCryptoAddress
);

/* ===========================
   PAYPAL CAPTURE (CLIENT SIDE FLOW)
   =========================== */
/**
 * Confirms PayPal order after client approval.
 */
router.post(
  '/paypal/capture',
  paymentController.capturePaypalPayment
);

module.exports = router;
