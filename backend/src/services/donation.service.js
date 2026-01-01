/**
 * Donation Service
 * ----------------
 * Business rules for donation lifecycle.
 */

const { DONATION } = require('../constants/statuses');

exports.canAcceptPayment = (donation) => {
  return donation.status === DONATION.PENDING;
};

exports.markCompleted = async (donation) => {
  donation.status = DONATION.COMPLETED;
  return donation.save();
};

exports.markFailed = async (donation) => {
  donation.status = DONATION.FAILED;
  return donation.save();
};
