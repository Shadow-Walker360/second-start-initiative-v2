/**
 * Payment Email Service
 * ---------------------
 * Generates and dispatches payment-related email notifications.
 */

const logger = require('../utils/logger');

exports.sendPaymentInitiatedEmail = async ({
  to,
  donorName,
  amount,
  currency,
  method,
}) => {
  if (!to) return;

  const subject = 'Your donation payment has started';
  const body = `
Hello ${donorName || 'Friend'},

We have received your donation intent.

Amount: ${amount} ${currency}
Payment Method: ${method}

Please complete the payment to finalize your donation.

Thank you for your support.
`;

  logger.info('Payment initiated email queued', {
    to,
    subject,
  });

  return { to, subject, body };
};

exports.sendPaymentSuccessEmail = async ({
  to,
  donorName,
  amount,
  currency,
  receiptId,
}) => {
  if (!to) return;

  const subject = 'Thank you — your donation was successful';
  const body = `
Hello ${donorName || 'Friend'},

Your donation has been successfully received.

Amount: ${amount} ${currency}
Receipt ID: ${receiptId}

We are deeply grateful for your support.

Warm regards,
Second Start Initiative
`;

  logger.info('Payment success email queued', {
    to,
    receiptId,
  });

  return { to, subject, body };
};

exports.sendPaymentFailedEmail = async ({
  to,
  donorName,
  amount,
  currency,
}) => {
  if (!to) return;

  const subject = 'Donation payment failed';
  const body = `
Hello ${donorName || 'Friend'},

Unfortunately, your donation payment could not be completed.

Amount: ${amount} ${currency}

No funds were deducted. You may try again at any time.

Thank you for your willingness to support.
`;

  logger.warn('Payment failed email queued', {
    to,
  });

  return { to, subject, body };
};
