/**
 * Card Client
 * -----------
 * Stripe-style SDK initialization
 */

const Stripe = require('stripe');

const stripe = new Stripe(process.env.CARD_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

module.exports = stripe;
