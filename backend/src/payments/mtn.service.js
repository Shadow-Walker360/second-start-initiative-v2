/**
 * MTN Mobile Money Service
 * -----------------------
 */

exports.initiatePayment = async ({ phone, amount }) => {
  return {
    status: 'pending',
    providerReference: `MTN-${Date.now()}`,
    instructions: {
      message: `MTN prompt sent to ${phone}`,
    },
  };
};

exports.verifyPayment = async ({ providerReference }) => {
  return {
    status: 'confirmed',
    providerReference,
  };
};
