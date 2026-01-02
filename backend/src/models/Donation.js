/**
 * Donation Model
 * --------------
 * Links payments to donors and causes
 */

const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },

    amount: { type: Number, required: true },
    currency: { type: String, required: true },

    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },

    isAnonymous: { type: Boolean, default: false },

    message: { type: String },

    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', DonationSchema);
