/**
 * Admin Controller
 * ----------------
 * Administrative and audit operations.
 */

const Donation = require('../models/Donation');
const Payment = require('../models/Payment');

/* ===========================
   DASHBOARD OVERVIEW
   =========================== */
exports.getOverview = async (_req, res, next) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const completed = await Donation.countDocuments({ status: 'completed' });

    return res.json({
      totalDonations,
      completed,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   LIST DONATIONS
   =========================== */
exports.listDonations = async (_req, res, next) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json(donations);
  } catch (error) {
    next(error);
  }
};

/* ===========================
   GET DONATION
   =========================== */
exports.getDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.donationId);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    next(error);
  }
};

/* ===========================
   CONFIRM DONATION
   =========================== */
exports.confirmDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.donationId);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    donation.status = 'completed';
    await donation.save();

    res.json({ message: 'Donation confirmed' });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   FAIL DONATION
   =========================== */
exports.failDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.donationId);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    donation.status = 'failed';
    await donation.save();

    res.json({ message: 'Donation marked as failed' });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   PROVIDER STATUS
   =========================== */
exports.getProvidersStatus = async (_req, res) => {
  res.json({
    card: true,
    mobileMoney: true,
    paypal: true,
    crypto: true,
    bank: true,
  });
};

/* ===========================
   SYSTEM HEALTH
   =========================== */
exports.getSystemHealth = async (_req, res) => {
  res.json({
    uptime: process.uptime(),
    status: 'healthy',
  });
};
