/**
 * Payment Controller
 * ------------------
 * Handles payment initiation and status tracking.
 */

const mongoose = require('mongoose');
const Donation = require('../models/Donation');
const Payment = require('../models/Payment');
const providers = require('../config/providers');

/* ===========================
   INITIATE PAYMENT
   =========================== */
exports.initiatePayment = async (req, res, next) => {
  try {
    const {
      donationId,
      method,
      provider,
      metadata,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(donationId)) {
      return res.status(400).json({ error: 'Invalid donation ID' });
    }

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    if (donation.status !== 'pending') {
      return res.status(409).json({
        error: 'Donation is no longer payable',
      });
    }

    const payment = await Payment.create({
      donation: donation._id,
      amount: donation.amount,
      currency: donation.currency,
      method,
      provider,
      status: 'initiated',
      metadata: metadata || {},
    });

    return res.status(201).json({
      paymentId: payment._id,
      donationId: donation._id,
      method,
      provider,
      status: payment.status,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   PAYMENT STATUS
   =========================== */
exports.getPaymentStatus = async (req, res, next) => {
  try {
    const { paymentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ error: 'Invalid payment ID' });
    }

    const payment = await Payment.findById(paymentId)
      .select('status method provider amount currency createdAt')
      .lean();

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    return res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

/* ===========================
   BANK TRANSFER NOTICE
   =========================== */
exports.notifyBankTransfer = async (req, res, next) => {
  try {
    const { paymentId, reference } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment || payment.method !== 'bank') {
      return res.status(400).json({ error: 'Invalid bank payment' });
    }

    payment.status = 'pending_confirmation';
    payment.metadata.reference = reference;

    await payment.save();

    return res.status(200).json({
      message: 'Bank transfer submitted for verification',
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   CRYPTO ADDRESS GENERATION
   =========================== */
exports.generateCryptoAddress = async (req, res, next) => {
  try {
    const { donationId, asset } = req.body;

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    const address = providers.crypto.generateAddress(asset);

    const payment = await Payment.create({
      donation: donation._id,
      amount: donation.amount,
      currency: asset,
      method: 'crypto',
      provider: 'onchain',
      status: 'awaiting_payment',
      metadata: { address },
    });

    return res.status(201).json({
      paymentId: payment._id,
      address,
      amount: donation.amount,
      asset,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================
   PAYPAL CAPTURE
   =========================== */
exports.capturePaypalPayment = async (req, res, next) => {
  try {
    const { paymentId, orderId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment || payment.provider !== 'paypal') {
      return res.status(400).json({ error: 'Invalid PayPal payment' });
    }

    payment.metadata.orderId = orderId;
    payment.status = 'processing';

    await payment.save();

    return res.status(200).json({
      message: 'PayPal payment captured',
    });
  } catch (error) {
    next(error);
  }
};
