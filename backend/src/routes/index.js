/**
 * API Route Index
 * ---------------
 * Central router for all application endpoints.
 * Handles API versioning and route grouping.
 */

const express = require('express');
const router = express.Router();

/* ===========================
   ROUTE MODULES
   =========================== */
const donationRoutes = require('./donation.routes');
const paymentRoutes = require('./payment.routes');
const webhookRoutes = require('./webhook.routes');
const adminRoutes = require('./admin.routes');

/* ===========================
   API VERSION
   =========================== */
const API_VERSION = '/v1';

/* ===========================
   HEALTH CHECK (API LEVEL)
   =========================== */
router.get('/', (_req, res) => {
  res.status(200).json({
    name: 'Second Start Initiative API',
    version: 'v1',
    status: 'operational',
    timestamp: new Date().toISOString(),
  });
});

/* ===========================
   PUBLIC ROUTES
   =========================== */
router.use(`${API_VERSION}/donations`, donationRoutes);

/* ===========================
   PAYMENT ROUTES
   =========================== */
router.use(`${API_VERSION}/payments`, paymentRoutes);

/* ===========================
   WEBHOOK ROUTES
   =========================== */
/**
 * IMPORTANT:
 * Webhooks are NOT versioned.
 * Providers expect static URLs.
 */
router.use('/webhooks', webhookRoutes);

/* ===========================
   ADMIN ROUTES
   =========================== */
router.use(`${API_VERSION}/admin`, adminRoutes);

module.exports = router;
