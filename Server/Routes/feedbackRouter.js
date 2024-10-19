const express=require("express");
const feedbackController = require('./../Controller/feedbackController')
const authController = require('./../Controller/authController')


const router= express.Router();

router.route('/').post(authController.protect,feedbackController.giveFeedback).get(authController.protect,feedbackController.getFeedback)

module.exports= router;