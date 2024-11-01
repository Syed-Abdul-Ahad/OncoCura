const Record = require('./../Model/recordModel');
const customError = require('./../utils/customError');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');

// Create a new record
exports.createRecord = asyncErrorHandler(async (req, res, next) => {
    const { recordName, analysisResult, kanbanRecords } = req.body;

    // Ensure userId is taken from the authenticated user (from req.user set in the protect middleware)
    const userId = req.user._id;

    // Create the new record
    const newRecord = await Record.create({
        userId,
        recordName,
        analysisResult,
        kanbanRecords: kanbanRecords || [] // Default to empty array if not provided
    });

    res.status(201).json({
        status: 'success',
        data: { record: newRecord }
    });
});

// Get all records for the authenticated user
exports.getRecords = asyncErrorHandler(async (req, res) => {
    const records = await Record.find({ userId: req.user._id }).populate(
      "kanbanRecords"
    );

    res.status(200).json({
        status: 'success',
        data: { records }
    });
});

// Get a single record by ID
exports.getSingleRecord = asyncErrorHandler(async (req, res, next) => {
    const recordId = req.params.recordId;

    const record = await Record.findById(recordId).populate('kanbanRecords');

    // Handle case where record is not found
    if (!record) {
        return next(new customError('Record not found', 404));
    }

    // Check if the record belongs to the authenticated user
    if (!record.userId.equals(req.user._id)) {
        return next(new customError('You do not have permission to access this record', 403));
    }

    res.status(200).json({
        status: 'success',
        data: { record }
    });
});

// Optionally, you might want to implement methods for updating and deleting records as well.
// For example, you could add the following methods to your recordController:

// Update a record by ID
exports.updateRecord = asyncErrorHandler(async (req, res, next) => {
    const recordId = req.params.recordId;

    // Ensure the record exists
    const record = await Record.findById(recordId);
    if (!record) {
        return next(new customError('Record not found', 404));
    }

    // Check if the record belongs to the authenticated user
    if (!record.userId.equals(req.user._id)) {
        return next(new customError('You do not have permission to update this record', 403));
    }

    // Update the record
    const updatedRecord = await Record.findByIdAndUpdate(recordId, req.body, { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data: { record: updatedRecord }
    });
});


// Delete a record by ID
exports.deleteRecord = asyncErrorHandler(async (req, res, next) => {
    const recordId = req.params.recordId;

    // Ensure the record exists
    const record = await Record.findById(recordId);
    if (!record) {
        return next(new customError('Record not found', 404));
    }

    // Check if the record belongs to the authenticated user
    if (!record.userId.equals(req.user._id)) {
        return next(new customError('You do not have permission to delete this record', 403));
    }

    // Delete the record
    await Record.findByIdAndDelete(recordId);

    res.status(204).json({
        status: 'success',
        data: null // No content to send back
    });
});
