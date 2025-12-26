/**
 * Admin Routes
 * ------------
 * Privileged endpoints for administration and operations.
 * ALL routes in this file require admin authentication.
 */

const express = require('express');
const router = express.Router();

/* ===========================
   MIDDLEWARES
   =========================== */
const authenticate = require('../middlewares/auth.middleware');
const requireAdmin = require('../middlewares/admin.middleware');
const validate = require('../middlewares/validate.middleware');

/* ===========================
   CONTROLLERS
   =========================== */
const adminController = require('../controllers/admin.controller');

/* ===========================
   ACCESS CONTROL
   =========================== */
/**
 * Every admin route requires:
 * 1. Valid authentication
 * 2. Admin role authorization
 */
router.use(authenticate);
router.use(requireAdmin);

/* ===========================
   DASHBOARD / OVERVIEW
   =========================== */
router.get(
  '/overview',
  adminController.getOverview
);

/* ===========================
   DONATIONS MANAGEMENT
   =========================== */

/**
 * List donations with filters:
 * - status
 * - provider
 * - date range
 * - amount range
 */
router.get(
  '/donations',
  adminController.listDonations
);

/**
 * Get single donation details
 */
router.get(
  '/donations/:donationId',
  adminController.getDonation
);

/**
 * Manually confirm a donation
 * (Used for bank transfers or exceptional cases)
 */
router.post(
  '/donations/:donationId/confirm',
  adminController.confirmDonation
);

/**
 * Mark donation as failed
 */
router.post(
  '/donations/:donationId/fail',
  adminController.failDonation
);

/* ===========================
   PAYMENT EVENTS / AUDIT
   =========================== */

/**
 * List payment events (audit trail)
 */
router.get(
  '/events',
  adminController.listPaymentEvents
);

/**
 * Get events for a specific donation
 */
router.get(
  '/donations/:donationId/events',
  adminController.getDonationEvents
);

/* ===========================
   PROVIDER STATUS
   =========================== */

/**
 * View enabled / disabled providers
 */
router.get(
  '/providers',
  adminController.getProvidersStatus
);

/* ===========================
   SYSTEM HEALTH
   =========================== */

/**
 * Internal health snapshot
 * (More detailed than public /health)
 */
router.get(
  '/health',
  adminController.getSystemHealth
);

module.exports = router;
