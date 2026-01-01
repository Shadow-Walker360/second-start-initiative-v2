/**
 * Card Payment Service
 * --------------------
 * Payment Intent based card processing
 */

const stripe = require('./card.client');

exports.initiatePayment = async ({
  amount,
  currency,
  metadata = {},
}) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // cents
    currency: currency.toLowerCase(),
    automatic_payment_methods: { enabled: true },
    metadata,
  });

  return {
    status: 'initiated',
    providerReference: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  };
};

exports.verifyPayment = async (providerReference) => {
  const intent = await stripe.paymentIntents.retrieve(providerReference);

  if (intent.status === 'succeeded') {
    return {
      status: 'confirmed',
      providerReference: intent.id,
    };
  }

  if (intent.status === 'requires_payment_method') {
    return {
      status: 'failed',
      providerReference: intent.id,
    };
  }

  return {
    status: 'pending',
    providerReference: intent.id,
  };
};
