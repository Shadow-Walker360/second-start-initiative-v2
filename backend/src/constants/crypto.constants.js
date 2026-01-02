/**
 * Crypto Constants
 * ----------------
 * Official receiving wallets
 */

module.exports = Object.freeze({
  SUPPORTED_CURRENCIES: ['BTC', 'ETH', 'USDT'],

  WALLETS: {
    BTC: {
      address: process.env.BTC_WALLET_ADDRESS,
      network: 'bitcoin',
      confirmationsRequired: 2,
    },
    ETH: {
      address: process.env.ETH_WALLET_ADDRESS,
      network: 'ethereum',
      confirmationsRequired: 12,
    },
    USDT: {
      address: process.env.USDT_WALLET_ADDRESS,
      network: 'ethereum',
      confirmationsRequired: 12,
    },
  },
});
