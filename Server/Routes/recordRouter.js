const express = require('express');
const recordController = require('./../Controller/recordController');
const authController = require('./../Controller/authController')

const router = express.Router();

router.post('/',authController.protect, recordController.createRecord);
router.get('/',authController.protect, recordController.getRecords);
router.get('/:recordId',authController.protect, recordController.getSingleRecord);
router.patch('/:recordId',authController.protect,recordController.updateRecord);
router.delete('/:recordId',authController.protect,recordController.deleteRecord)

module.exports = router;