/**
 * PayPal Payment Service
 * ---------------------
 * Creates and captures PayPal orders
 */

const paypalClient = require('./paypal.client');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

exports.initiatePayment = async ({ amount, currency }) => {
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount.toFixed(2),
        },
      },
    ],
  });

  const response = await paypalClient.execute(request);

  const approvalLink = response.result.links.find(
    (link) => link.rel === 'approve'
  );

  return {
    status: 'initiated',
    providerReference: response.result.id,
    redirectUrl: approvalLink.href,
  };
};

exports.capturePayment = async (providerReference) => {
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(
    providerReference
  );
  request.requestBody({});

  const response = await paypalClient.execute(request);

  return {
    status: 'confirmed',
    providerReference: response.result.id,
  };
};
