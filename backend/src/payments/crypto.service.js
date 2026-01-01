/**
 * Crypto Payment Service
 * ---------------------
 */

exports.initiatePayment = async ({ amount, currency }) => {
  return {
    status: 'awaiting_payment',
    providerReference: `CRYPTO-${Date.now()}`,
    instructions: {
      walletAddress: '0xABC123DEF456',
      network: 'USDT-TRC20',
      amount,
      currency,
    },
  };
};

exports.verifyPayment = async ({ providerReference }) => {
  return {
    status: 'confirmed',
    providerReference,
  };
};
