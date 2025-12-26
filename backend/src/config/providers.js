/**
 * Payment Providers Configuration
 * -------------------------------
 * Central registry of all supported payment providers.
 * This file defines:
 * - Provider identifiers
 * - Display metadata
 * - Capabilities
 * - Operational flags
 *
 * NO API calls.
 * NO secrets.
 * NO logic.
 */

const PROVIDERS = Object.freeze({
  /* ===========================
     MOBILE MONEY
     =========================== */
  MPESA: {
    key: 'mpesa',
    type: 'mobile_money',
    name: 'M-Pesa',
    countries: ['KE'],
    currencies: ['KES'],
    requiresPhone: true,
    supportsRecurring: true,
    enabled: true,
  },

  AIRTEL: {
    key: 'airtel',
    type: 'mobile_money',
    name: 'Airtel Money',
    countries: ['KE', 'UG', 'TZ'],
    currencies: ['KES', 'UGX', 'TZS'],
    requiresPhone: true,
    supportsRecurring: false,
    enabled: true,
  },

  MTN: {
    key: 'mtn',
    type: 'mobile_money',
    name: 'MTN Mobile Money',
    countries: ['UG', 'GH', 'RW'],
    currencies: ['UGX', 'GHS', 'RWF'],
    requiresPhone: true,
    supportsRecurring: false,
    enabled: true,
  },

  /* ===========================
     CARD PAYMENTS
     =========================== */
  CARD: {
    key: 'card',
    type: 'card',
    name: 'Credit / Debit Card',
    networks: ['VISA', 'MASTERCARD', 'AMEX'],
    currencies: ['USD', 'EUR', 'KES'],
    requiresRedirect: true,
    supportsRecurring: true,
    enabled: true,
  },

  /* ===========================
     PAYPAL
     =========================== */
  PAYPAL: {
    key: 'paypal',
    type: 'wallet',
    name: 'PayPal',
    currencies: ['USD', 'EUR'],
    requiresRedirect: true,
    supportsRecurring: true,
    enabled: true,
  },

  /* ===========================
     BANK TRANSFER
     =========================== */
  BANK: {
    key: 'bank',
    type: 'bank_transfer',
    name: 'Bank Transfer',
    currencies: ['USD', 'EUR', 'KES'],
    requiresManualConfirmation: true,
    supportsRecurring: false,
    enabled: true,
  },

  /* ===========================
     CRYPTO
     =========================== */
  CRYPTO: {
    key: 'crypto',
    type: 'crypto',
    name: 'Cryptocurrency',
    currencies: ['BTC', 'ETH', 'USDT'],
    requiresAddressGeneration: true,
    supportsRecurring: false,
    enabled: true,
    networks: {
      BTC: ['bitcoin'],
      ETH: ['ethereum'],
      USDT: ['ethereum', 'tron'],
    },
  },
});

/* ===========================
   DERIVED HELPERS
   =========================== */

const PROVIDER_MAP = Object.values(PROVIDERS).reduce((acc, provider) => {
  acc[provider.key] = provider;
  return acc;
}, {});

const ENABLED_PROVIDERS = Object.values(PROVIDERS).filter(
  (p) => p.enabled
);

module.exports = {
  PROVIDERS,
  PROVIDER_MAP,
  ENABLED_PROVIDERS,
};
