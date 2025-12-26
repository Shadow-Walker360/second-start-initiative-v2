/**
 * Donation Model
 * --------------
 * Represents a donation intent.
 */

const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
      enum: ['USD', 'EUR', 'KES'],
    },

    donorName: {
      type: String,
      trim: true,
      default: 'Anonymous',
    },

    donorEmail: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 500,
      default: null,
    },

    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ===========================
   INDEXES
   =========================== */
DonationSchema.index({ createdAt: -1 });
DonationSchema.index({ status: 1 });

module.exports = mongoose.model('Donation', DonationSchema);
