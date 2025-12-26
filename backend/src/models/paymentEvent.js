/**
 * Payment Model
 * -------------
 * Represents a payment attempt for a donation.
 */

const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation',
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
    },

    method: {
      type: String,
      required: true,
      enum: ['card', 'mobile_money', 'paypal', 'crypto', 'bank'],
      index: true,
    },

    provider: {
      type: String,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: [
        'initiated',
        'processing',
        'awaiting_payment',
        'pending_confirmation',
        'confirmed',
        'failed',
      ],
      default: 'initiated',
      index: true,
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

/* ===========================
   INDEXES
   =========================== */
PaymentSchema.index({ donation: 1, createdAt: -1 });
PaymentSchema.index({ provider: 1, status: 1 });

module.exports = mongoose.model('Payment', PaymentSchema);
