/**
 * Payment Providers
 * -----------------
 * Canonical identifiers for payment providers.
 */

module.exports = Object.freeze({
  // Card
  STRIPE: 'stripe',
  PAYSTACK: 'paystack',
  FLUTTERWAVE: 'flutterwave',

  // Mobile Money
  MPESA: 'mpesa',
  AIRTEL: 'airtel',
  MTN: 'mtn',

  // Digital Wallets
  PAYPAL: 'paypal',

  // Crypto
  ONCHAIN: 'onchain',

  // Bank
  MANUAL_BANK: 'manual_bank',
});
