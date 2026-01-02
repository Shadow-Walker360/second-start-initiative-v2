/**
 * Crypto Utilities
 * ----------------
 * Blockchain helpers
 */

const axios = require('axios');

exports.fetchEthTransactions = async (address) => {
  const response = await axios.get(
    `https://api.etherscan.io/api`,
    {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        sort: 'desc',
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    }
  );

  return response.data.result || [];
};

exports.fetchBtcTransactions = async (address) => {
  const response = await axios.get(
    `https://blockchain.info/rawaddr/${address}`
  );
  return response.data.txs || [];
};
