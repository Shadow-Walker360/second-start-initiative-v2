/**
 * Airtel Money Client
 * -------------------
 * OAuth token management & headers
 */

const axios = require('axios');

let cachedToken = null;
let tokenExpiry = null;

const getBaseUrl = () =>
  process.env.AIRTEL_ENV === 'production'
    ? 'https://openapi.airtel.africa'
    : 'https://openapiuat.airtel.africa';

const getAccessToken = async () => {
  if (cachedToken && tokenExpiry && tokenExpiry > Date.now()) {
    return cachedToken;
  }

  const response = await axios.post(
    `${getBaseUrl()}/auth/oauth2/token`,
    {
      client_id: process.env.AIRTEL_CLIENT_ID,
      client_secret: process.env.AIRTEL_CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;

  return cachedToken;
};

const getAuthHeaders = async () => {
  const token = await getAccessToken();
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

module.exports = { getBaseUrl, getAuthHeaders };
