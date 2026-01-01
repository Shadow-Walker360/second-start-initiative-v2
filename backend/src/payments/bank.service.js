/**
 * Bank Transfer Service
 * ---------------------
 */

exports.initiatePayment = async ({ amount, currency }) => {
  return {
    status: 'pending',
    providerReference: `BANK-${Date.now()}`,
    instructions: {
      bankName: 'Example Bank',
      accountName: 'Second Start Initiative',
      accountNumber: '1234567890',
      reference: `DON-${Date.now()}`,
    },
  };
};

exports.verifyPayment = async ({ providerReference }) => {
  return {
    status: 'confirmed',
    providerReference,
  };
};
