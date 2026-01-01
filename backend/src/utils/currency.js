/**
 * Currency Utility
 * ----------------
 * Handles currency normalization and validation.
 */

const SUPPORTED = ['USD', 'EUR', 'KES'];

exports.isSupported = (currency) => {
  return SUPPORTED.includes(currency);
};

exports.normalize = (currency) => {
  return currency.toUpperCase();
};

exports.formatAmount = (amount, currency) => {
  return {
    amount: Number(amount),
    currency: currency.toUpperCase(),
  };
};
