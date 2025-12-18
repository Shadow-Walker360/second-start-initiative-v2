const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_ENV,
  CALLBACK_URL
} = process.env;

// Get OAuth token
async function getAccessToken() {
  const url = MPESA_ENV === 'sandbox' 
    ? 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials' 
    : 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  const { data } = await axios.get(url, { headers: { Authorization: `Basic ${auth}` } });
  return data.access_token;
}

// STK Push
router.post('/stkpush', async (req, res) => {
  try {
    const { phone, amount } = req.body;
    if (!phone || !amount) return res.status(400).json({ error: 'Phone and amount required' });

    const token = await getAccessToken();
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

    const stkPushBody = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: CALLBACK_URL,
      AccountReference: "SecondStartInitiative",
      TransactionDesc: "Donation"
    };

    const url = MPESA_ENV === 'sandbox' 
      ? 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest' 
      : 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const { data } = await axios.post(url, stkPushBody, { headers: { Authorization: `Bearer ${token}` } });
    res.json(data);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: 'STK Push failed', details: err.response?.data || err.message });
  }
});

// Callback endpoint (Safaricom calls this after payment)
router.post('/callback', (req, res) => {
  console.log('STK Callback:', req.body);
  res.sendStatus(200); // always respond 200 to Safaricom
});

module.exports = router;
