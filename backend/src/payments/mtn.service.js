/**
 * MTN Mobile Money Service
 * -----------------------
 * Request-to-Pay initiation
 */

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { getBaseUrl, getAuthHeaders } = require('./mtn.client');

exports.initiatePayment = async ({
  phone,
  amount,
  currency,
  reference,
  payerMessage,
  payeeNote,
}) => {
  const referenceId = uuidv4();
  const headers = await getAuthHeaders();

  await axios.post(
    `${getBaseUrl()}/collection/v1_0/requesttopay`,
    {
      amount: amount.toString(),
      currency,
      externalId: reference,
      payer: {
        partyIdType: 'MSISDN',
        partyId: phone,
      },
      payerMessage: payerMessage || 'Donation payment',
      payeeNote: payeeNote || 'Thank you for your support',
    },
    {
      headers: {
        ...headers,
        'X-Reference-Id': referenceId,
        'Content-Type': 'application/json',
      },
    }
  );

  return {
    status: 'pending',
    providerReference: referenceId,
    instructions: {
      message: 'MTN Mobile Money prompt sent to your phone',
    },
  };
};
