/**
 * Payment Provider Router
 */

const card = require('./card.service');
const bank = require('./bank.service');
const crypto = require('./crypto.service');
const mpesa = require('./mpesa.service');
const mtn = require('./mtn.service');
const airtel = require('./airtel.service');
const paypal = require('./paypal.service');

module.exports = {
  card,
  bank,
  crypto,
  mpesa,
  mtn,
  airtel,
  paypal,
};
