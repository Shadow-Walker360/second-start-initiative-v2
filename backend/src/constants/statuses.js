/**
 * System Statuses
 * ---------------
 * Canonical statuses for donations and payments.
 */

module.exports = Object.freeze({
  DONATION: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },

  PAYMENT: {
    INITIATED: 'initiated',
    PROCESSING: 'processing',
    AWAITING_PAYMENT: 'awaiting_payment',
    PENDING_CONFIRMATION: 'pending_confirmation',
    CONFIRMED: 'confirmed',
    FAILED: 'failed',
  },
});
