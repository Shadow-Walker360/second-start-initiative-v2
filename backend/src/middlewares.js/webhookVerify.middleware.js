/**
 * Webhook Verification Middleware
 * -------------------------------
 */

const crypto = require('crypto');

exports.verifyWebhook = (secret) => (req, res, next) => {
  const signature = req.headers['x-signature'];
  if (!signature) return res.sendStatus(401);

  const payload = JSON.stringify(req.body);
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  if (signature !== expected) {
    return res.sendStatus(401);
  }

  next();
};
