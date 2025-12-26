/**
 * Webhook Controller
 * ------------------
 * Handles payment provider callbacks.
 */

const Payment = require('../models/Payment');
const Donation = require('../models/Donation');

/* ===========================
   CARD WEBHOOK
   =========================== */
exports.handleCardWebhook = async (req, res, next) => {
  try {
    const event = req.body;

    const payment = await Payment.findOne({
      'metadata.reference': event.reference,
    });

    if (!payment) return res.status(200).end();

    if (event.status === 'success') {
      payment.status = 'confirmed';
      await payment.save();

      await Donation.findByIdAndUpdate(payment.donation, {
        status: 'completed',
      });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

/* ===========================
   MOBILE MONEY WEBHOOK
   =========================== */
exports.handleMobileMoneyWebhook = async (req, res, next) => {
  try {
    const { reference, status } = req.body;

    const payment = await Payment.findOne({
      'metadata.reference': reference,
    });

    if (!payment) return res.status(200).end();

    if (status === 'SUCCESS') {
      payment.status = 'confirmed';
      await payment.save();

      await Donation.findByIdAndUpdate(payment.donation, {
        status: 'completed',
      });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

/* ===========================
   PAYPAL WEBHOOK
   =========================== */
exports.handlePaypalWebhook = async (req, res, next) => {
  try {
    const event = req.body;

    const payment = await Payment.findOne({
      'metadata.orderId': event.resource.id,
    });

    if (!payment) return res.status(200).end();

    payment.status = 'confirmed';
    await payment.save();

    await Donation.findByIdAndUpdate(payment.donation, {
      status: 'completed',
    });

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

/* ===========================
   CRYPTO WEBHOOK
   =========================== */
exports.handleCryptoWebhook = async (req, res, next) => {
  try {
    const { address, confirmations } = req.body;

    const payment = await Payment.findOne({
      'metadata.address': address,
    });

    if (!payment) return res.status(200).end();

    if (confirmations >= 3) {
      payment.status = 'confirmed';
      await payment.save();

      await Donation.findByIdAndUpdate(payment.donation, {
        status: 'completed',
      });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

/* ===========================
   BANK WEBHOOK
   =========================== */
exports.handleBankWebhook = async (req, res, next) => {
  try {
    const { reference } = req.body;

    const payment = await Payment.findOne({
      'metadata.reference': reference,
    });

    if (!payment) return res.status(200).end();

    payment.status = 'confirmed';
    await payment.save();

    await Donation.findByIdAndUpdate(payment.donation, {
      status: 'completed',
    });

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};
