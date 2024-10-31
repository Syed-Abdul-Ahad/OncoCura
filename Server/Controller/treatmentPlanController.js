const TreatmentPlan = require('./../Model/treatmentPlanModel');
const Record = require('./../Model/recordModel');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');


// exports.createTreatmentPlan = asyncErrorHandler(async (req, res) => {
//     const { recordId, content } = req.body;

//     const newPlan = await TreatmentPlan.create({
//         recordId,
//         content
//     });

//     await Record.findByIdAndUpdate(recordId, { $push: { kanbanRecords: newPlan._id } });

//     res.status(201).json({
//         status: 'success',
//         data: newPlan
//     });
// });

// exports.updateTreatmentPlanStatus = asyncErrorHandler(async (req, res) => {
//     const { planId, status } = req.body;
    
//     const updatedPlan = await TreatmentPlan.findByIdAndUpdate(planId, { status }, { new: true });

//     res.status(200).json({
//         status: 'success',
//         data: updatedPlan
//     });
// });

// exports.deleteTreatmentPlan = asyncErrorHandler(async (req, res) => {
//     const { planId, recordId } = req.body;

//     await TreatmentPlan.findByIdAndDelete(planId);
//     await Record.findByIdAndUpdate(recordId, { $pull: { kanbanRecords: planId } });

//     res.status(204).json({
//         status: 'success',
//         data: null
//     });
// });



exports.createTreatmentPlan = asyncErrorHandler(async (req, res) => {
    const { recordId } = req.params;
    const { content } = req.body;

    const newPlan = await TreatmentPlan.create({
        recordId,
        content
    });

    await Record.findByIdAndUpdate(recordId, { $push: { kanbanRecords: newPlan._id } });

    res.status(201).json({
        status: 'success',
        data: newPlan
    });
});


exports.deleteTreatmentPlan = asyncErrorHandler(async (req, res) => {
    const { planId } = req.params;
    const { recordId } = req.params;

    await TreatmentPlan.findByIdAndDelete(planId);
    await Record.findByIdAndUpdate(recordId, { $pull: { kanbanRecords: planId } });

    res.status(204).json({
        status: 'success',
        data: null
    });
});



exports.getTreatmentPlansByRecord = asyncErrorHandler(async (req, res) => {
    const { recordId } = req.params;

    const plans = await TreatmentPlan.find({ recordId });

    res.status(200).json({
        status: 'success',
        data: plans
    });
});



exports.updateTreatmentPlanStatus = asyncErrorHandler(async (req, res) => {
    const {status } = req.body;
    const {planId} = req.params
    
    const updatedPlan = await TreatmentPlan.findByIdAndUpdate(planId, { status }, { new: true });

    res.status(200).json({
        status: 'success',
        data: updatedPlan
    });
});