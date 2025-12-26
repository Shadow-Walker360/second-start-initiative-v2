/**
 * Donation Controller
 * -------------------
 * Handles donation intent lifecycle.
 */

const mongoose = require('mongoose');
const Donation = require('../models/Donation');
const Payment = require('../models/Payment');

/* ===========================
   CREATE DONATION INTENT
   =========================== */
exports.createDonation = async (req, res, next) => {
  try {
    const {
      amount,
      currency,
      donorName,
      donorEmail,
      message,
    } = req.body;

    /* ---------------------------
       BASIC VALIDATION
       --------------------------- */
    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: 'Invalid donation amount',
      });
    }

    const supportedCurrencies = ['USD', 'EUR', 'KES'];
    if (!supportedCurrencies.includes(currency)) {
      return res.status(400).json({
        error: 'Unsupported currency',
      });
    }

    /* ---------------------------
       CREATE DONATION
       --------------------------- */
    const donation = await Donation.create({
      amount,
      currency,
      donorName: donorName || 'Anonymous',
      donorEmail: donorEmail || null,
      message: message || null,
      status: 'pending',
    });

    return res.status(201).json({
      donationId: donation._id,
      status: donation.status,
      amount: donation.amount,
      currency: donation.currency,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   GET DONATION STATUS
   =========================== */
exports.getDonationStatus = async (req, res, next) => {
  try {
    const { donationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(donationId)) {
      return res.status(400).json({
        error: 'Invalid donation ID',
      });
    }

    const donation = await Donation.findById(donationId).lean();

    if (!donation) {
      return res.status(404).json({
        error: 'Donation not found',
      });
    }

    /* ---------------------------
       AGGREGATE PAYMENTS
       --------------------------- */
    const payments = await Payment.find({
      donation: donationId,
    })
      .select('status provider amount currency createdAt')
      .lean();

    return res.status(200).json({
      donationId: donation._id,
      status: donation.status,
      amount: donation.amount,
      currency: donation.currency,
      payments,
    });
  } catch (error) {
    next(error);
  }
};
