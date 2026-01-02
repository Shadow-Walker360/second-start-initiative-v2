/**
 * MTN Mobile Money Client
 * ----------------------
 * Handles authorization headers for MTN MoMo API
 */

const axios = require('axios');

const getBaseUrl = () =>
  process.env.MTN_ENV === 'production'
    ? 'https://proxy.momoapi.mtn.com'
    : 'https://sandbox.momodeveloper.mtn.com';

const getAuthHeaders = async () => {
  const apiKey = process.env.MTN_API_KEY;
  const userId = process.env.MTN_USER_ID;
  const subscriptionKey = process.env.MTN_SUBSCRIPTION_KEY;

  if (!apiKey || !userId || !subscriptionKey) {
    throw new Error('Missing MTN Mobile Money credentials');
  }

  const tokenResponse = await axios.post(
    `${getBaseUrl()}/collection/token/`,
    {},
    {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        Authorization:
          'Basic ' +
          Buffer.from(`${userId}:${apiKey}`).toString('base64'),
      },
    }
  );

  return {
    Authorization: `Bearer ${tokenResponse.data.access_token}`,
    'Ocp-Apim-Subscription-Key': subscriptionKey,
    'X-Target-Environment': process.env.MTN_ENV || 'sandbox',
  };
};

module.exports = { getBaseUrl, getAuthHeaders };
