const express = require('express');
const checkoutController = require('./../Controller/checkoutController');
const authController = require('./../Controller/authController');

const router = express.Router();

// Route to create a new checkout
router.post('/create', authController.protect,checkoutController.createCheckout);

// Route to get a user's checkout details
router.get('/my-order',authController.protect, checkoutController.getCheckout);

module.exports = router;
