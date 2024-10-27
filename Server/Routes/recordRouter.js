const express = require('express');
const recordController = require('./../Controller/recordController');

const router = express.Router();

router
  .route('/')
  .get(recordController.getRecords)    
  .post(recordController.createRecord); 


module.exports = router;
