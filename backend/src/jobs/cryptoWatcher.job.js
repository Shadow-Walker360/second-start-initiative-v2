/**
 * Crypto Watcher Job
 * ------------------
 * Confirms on-chain payments
 */

const cryptoUtils = require('../utils/crypto');
const cryptoConstants = require('../constants/crypto.constants');
const paymentService = require('../services/payment.service');
const donationService = require('../services/donation.service');

exports.run = async () => {
  const pendingPayments = await paymentService.getPendingCryptoPayments();

  for (const payment of pendingPayments) {
    const wallet = cryptoConstants.WALLETS[payment.currency];

    if (payment.currency === 'ETH' || payment.currency === 'USDT') {
      const txs = await cryptoUtils.fetchEthTransactions(wallet.address);

      const match = txs.find(
        (tx) =>
          tx.value === payment.amount &&
          tx.confirmations >= wallet.confirmationsRequired
      );

      if (match) {
        await paymentService.markConfirmed(payment.providerReference, match.hash);
        await donationService.markCompleted(payment.providerReference);
      }
    }

    if (payment.currency === 'BTC') {
      const txs = await cryptoUtils.fetchBtcTransactions(wallet.address);

      const match = txs.find(
        (tx) =>
          tx.confirmations >= wallet.confirmationsRequired
      );

      if (match) {
        await paymentService.markConfirmed(payment.providerReference, match.hash);
        await donationService.markCompleted(payment.providerReference);
      }
    }
  }
};
