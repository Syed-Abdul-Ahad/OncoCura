const customError = require('../utils/customError')
const Feedback = require('./../Model/feedbackModel')
const asyncErrorHandler = require('./../utils/asyncErrorHandler')
const util = require('util')
const env = require('dotenv')
env.config({path:'./config.env'})


exports.giveFeedback = asyncErrorHandler(async (req,res,next)=>{

   const feedback= await Feedback.create(req.body);

    res.status(201).json({
        status:"success",
        data:{
            data: feedback
        }
    })
})

exports.getFeedback = asyncErrorHandler(async (req,res,next)=>{

    const feedback= await Feedback.find();
 
     res.status(200).json({
         status:"success",
         data:{
             data: feedback
         }
     })
 })