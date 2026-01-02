/**
 * Payment Model
 * -------------
 * Immutable financial transaction record
 */

const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },

    method: {
      type: String,
      enum: [
        'card',
        'paypal',
        'mpesa',
        'airtel',
        'mtn',
        'bank',
        'crypto',
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed'],
      default: 'pending',
    },

    providerReference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    providerTransactionId: { type: String },

    metadata: { type: Object },

    confirmedAt: { type: Date },
    failedReason: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
