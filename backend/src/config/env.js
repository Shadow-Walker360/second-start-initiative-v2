/**
 * Environment Configuration
 * -------------------------
 * Centralized, validated access to environment variables.
 * This file MUST be imported before using any config values.
 */

const REQUIRED_VARS = [
  'NODE_ENV',
  'PORT',
  'MONGO_URI',
];

/* ===========================
   LOAD & VALIDATE
   =========================== */
function validateEnv() {
  const missing = REQUIRED_VARS.filter(
    (key) => !process.env[key]
  );

  if (missing.length) {
    console.error(
      `❌ Missing required environment variables: ${missing.join(', ')}`
    );
    process.exit(1);
  }
}

validateEnv();

/* ===========================
   NORMALIZED CONFIG
   =========================== */
const env = {
  nodeEnv: process.env.NODE_ENV,

  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',

  port: Number(process.env.PORT),

  database: {
    uri: process.env.MONGO_URI,
  },

  security: {
    rateLimitWindowMs: 15 * 60 * 1000,
    rateLimitMax: process.env.NODE_ENV === 'production' ? 200 : 500,
  },

  payments: {
    mpesa: {
      enabled: Boolean(process.env.MPESA_CONSUMER_KEY),
    },
    paypal: {
      enabled: Boolean(process.env.PAYPAL_CLIENT_ID),
    },
    card: {
      enabled: Boolean(process.env.CARD_PROVIDER_KEY),
    },
    crypto: {
      enabled: Boolean(process.env.CRYPTO_WALLET_XPUB),
    },
  },
};

module.exports = env;
