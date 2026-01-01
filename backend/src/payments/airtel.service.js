/**
 * Airtel Money Service
 * --------------------
 */

exports.initiatePayment = async ({ phone, amount }) => {
  return {
    status: 'pending',
    providerReference: `AIRTEL-${Date.now()}`,
    instructions: {
      message: `Airtel Money prompt sent to ${phone}`,
    },
  };
};

exports.verifyPayment = async ({ providerReference }) => {
  return {
    status: 'confirmed',
    providerReference,
  };
};
