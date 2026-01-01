/**
 * M-PESA Payment Service
 * ---------------------
 * STK Push initiation
 */

const axios = require('axios');
const { getAccessToken } = require('./mpesa.client');

exports.initiatePayment = async ({
  phone,
  amount,
  reference,
  description,
}) => {
  const token = await getAccessToken();

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, '')
    .slice(0, 14);

  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString('base64');

  const url =
    process.env.MPESA_ENV === 'production'
      ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
      : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  const response = await axios.post(
    url,
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: `${process.env.BASE_URL}/api/webhooks/mpesa`,
      AccountReference: reference,
      TransactionDesc: description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    status: 'pending',
    providerReference: response.data.CheckoutRequestID,
    instructions: {
      message: 'STK Push sent to your phone',
    },
  };
};
