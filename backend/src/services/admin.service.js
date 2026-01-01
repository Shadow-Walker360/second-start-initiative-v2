/**
 * Admin Service
 * -------------
 * Administrative business logic.
 */

const Donation = require('../models/Donation');
const Payment = require('../models/Payment');
const { DONATION, PAYMENT } = require('../constants/statuses');

exports.confirmDonationManually = async (donationId) => {
  const donation = await Donation.findById(donationId);
  if (!donation) throw new Error('Donation not found');

  donation.status = DONATION.COMPLETED;
  await donation.save();

  await Payment.updateMany(
    { donation: donationId },
    { status: PAYMENT.CONFIRMED }
  );

  return donation;
};

exports.failDonationManually = async (donationId, reason) => {
  const donation = await Donation.findById(donationId);
  if (!donation) throw new Error('Donation not found');

  donation.status = DONATION.FAILED;
  await donation.save();

  await Payment.updateMany(
    { donation: donationId },
    {
      status: PAYMENT.FAILED,
      $set: { 'metadata.failureReason': reason },
    }
  );

  return donation;
};

exports.getSystemMetrics = async () => {
  const totalDonations = await Donation.countDocuments();
  const completedDonations = await Donation.countDocuments({
    status: DONATION.COMPLETED,
  });

  return {
    totalDonations,
    completedDonations,
  };
};
