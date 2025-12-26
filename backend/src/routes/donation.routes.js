/**
 * Donation Routes
 * ---------------
 * Handles donation intent creation and retrieval.
 * No direct payment processing occurs here.
 */

const express = require('express');
const router = express.Router();

/* ===========================
   MIDDLEWARES
   =========================== */
const validate = require('../middlewares/validate.middleware');

/* ===========================
   CONTROLLERS
   =========================== */
const donationController = require('../controllers/donation.controller');

/* ===========================
   CREATE DONATION INTENT
   =========================== */
/**
 * Creates a donation intent before payment.
 * Returns a donationId used in payment initiation.
 */
router.post(
  '/',
  donationController.createDonation
);

/* ===========================
   GET DONATION STATUS
   =========================== */
/**
 * Public-safe endpoint to check donation status.
 */
router.get(
  '/:donationId',
  donationController.getDonationStatus
);

module.exports = router;
