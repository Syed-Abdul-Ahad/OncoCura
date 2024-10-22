const express = require('express');
const cartController = require('./../Controller/cartController');
const authController = require('./../Controller/authController');

const router = express.Router();

router.post('/add', authController.protect, cartController.addToCart);
router.post('/remove', authController.protect, cartController.removeFromCart);
router.get('/getCart', authController.protect, cartController.getCart)

module.exports = router;
