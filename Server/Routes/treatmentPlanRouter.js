const express = require('express');
const treatmentPlanController = require('./../Controller/treatmentPlanController');
const authController = require('./../Controller/authController')
const router = express.Router();


router.post('/create/:recordId', authController.protect,treatmentPlanController.createTreatmentPlan);
router.patch('/status/:planId',authController.protect, treatmentPlanController.updateTreatmentPlanStatus);
router.delete('/:recordId/:planId',authController.protect, treatmentPlanController.deleteTreatmentPlan);
router.get('/:recordId',authController.protect,treatmentPlanController.getTreatmentPlansByRecord)


module.exports = router;