const catchAsyncErrors = require('../middlewares/errors/catchAsyncErrors');

//
const stripe = require('stripe')(process.env.STRIPE_API_SECRET_KEY);

// stripe payment process ==> /api/v1/payment/process
exports.paymentProccess = catchAsyncErrors(async (req, res, next) => {
     const paymentIntent = await stripe.paymentIntents.create({
          amount: req.body.amount,
          currency: 'INR',

          metadata: { integration_check: 'accept_a_payment' }
     });
     res.status(200).json({
          success: true,
          client_secret: paymentIntent.client_secret
     })
});

// set client api key ==> /api/v1/payment/stripekey
exports.sendClientKey = catchAsyncErrors(async (req, res, next) => {

     res.status(200).json({
          success: true,
          stripe_key: process.env.STRIPE_API_KEY
     })
})