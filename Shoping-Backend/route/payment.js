const express = require("express");
const { paymentProccess, sendClientKey } = require("../controller/payment");

const { isAuthenticatedUser } = require("../middlewares/auth/checkAuth");
const route = express.Router();


// route.route('');
route.post('/process', isAuthenticatedUser, paymentProccess)
route.get('/stripekey', isAuthenticatedUser, sendClientKey)

// admin route 



module.exports = route;