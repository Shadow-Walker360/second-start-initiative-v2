/**
 * Security Configuration
 * ---------------------
 * Centralized security policy for the backend.
 * No middleware is initialized here.
 * No secrets are stored here.
 */

const env = require('./env');

const security = Object.freeze({
  /* ===========================
     GENERAL SECURITY
     =========================== */
  trustProxy: true,

  cors: {
    enabled: true,
    credentials: true,
    allowedMethods: ['GET', 'POST', 'PUT', 'PATCH'],
    // In production, origins should be explicitly set via env
    allowAllOrigins: !env.isProduction,
  },

  /* ===========================
     RATE LIMITING
     =========================== */
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: env.isProduction ? 200 : 500,
    skipSuccessfulRequests: false,
  },

  /* ===========================
     REQUEST BODY LIMITS
     =========================== */
  bodyLimits: {
    json: '1mb',
    urlEncoded: '1mb',
  },

  /* ===========================
     AUTHENTICATION
     =========================== */
  auth: {
    jwt: {
      expiresIn: '1h',
      refreshExpiresIn: '7d',
      algorithm: 'HS256',
    },
  },

  /* ===========================
     WEBHOOK SECURITY
     =========================== */
  webhooks: {
    toleranceSeconds: 300, // 5 minutes timestamp tolerance
    requireSignature: true,
    allowedMethods: ['POST'],
  },

  /* ===========================
     CRYPTO PAYMENTS
     =========================== */
  crypto: {
    confirmationsRequired: {
      BTC: 3,
      ETH: 12,
      USDT: 12,
    },
    addressReuseAllowed: false,
  },

  /* ===========================
     LOGGING & AUDIT
     =========================== */
  logging: {
    maskSensitiveFields: [
      'password',
      'cardNumber',
      'cvv',
      'authorization',
      'token',
    ],
    auditLogRetentionDays: 365,
  },

  /* ===========================
     ERROR HANDLING
     =========================== */
  errors: {
    exposeStack: !env.isProduction,
    genericMessage: 'An unexpected error occurred',
  },
});

module.exports = security;
