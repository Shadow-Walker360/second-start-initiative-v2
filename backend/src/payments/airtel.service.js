/**
 * Airtel Money Payment Service
 * ----------------------------
 * Payment initiation
 */

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { getBaseUrl, getAuthHeaders } = require('./airtel.client');

exports.initiatePayment = async ({
  phone,
  amount,
  currency,
  reference,
  description,
}) => {
  const headers = await getAuthHeaders();
  const transactionId = uuidv4();

  await axios.post(
    `${getBaseUrl()}/merchant/v1/payments/`,
    {
      reference,
      subscriber: {
        country: 'KE',
        currency,
        msisdn: phone,
      },
      transaction: {
        amount: amount.toString(),
        currency,
        id: transactionId,
      },
      description: description || 'Donation payment',
    },
    { headers }
  );

  return {
    status: 'pending',
    providerReference: transactionId,
    instructions: {
      message: 'Airtel Money prompt sent to your phone',
    },
  };
};
