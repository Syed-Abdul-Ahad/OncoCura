const Record = require('./../Model/recordModel');
const customError = require('./../utils/customError');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');

exports.createRecord = asyncErrorHandler(async (req, res, next) => {
  const { recordName, analysisResult, kanbanRecords, summary } = req.body;

  const userId = req.user._id;

  console.log("userId ; ", userId);

  const newRecord = await Record.create({
    userId,
    recordName,
    analysisResult,
    summary,
    kanbanRecords: kanbanRecords || [],
  });

  res.status(201).json({
    status: "success",
    data: { record: newRecord },
  });
});

exports.getRecords = asyncErrorHandler(async (req, res) => {
  const records = await Record.find({ userId: req.user._id }).populate(
    "kanbanRecords"
  );

  res.status(200).json({
    status: "success",
    data: { records },
  });
});

exports.getSingleRecord = asyncErrorHandler(async (req, res, next) => {
  const recordId = req.params.recordId;

  const record = await Record.findById(recordId).populate("kanbanRecords");

  // Handle case where record is not found
  if (!record) {
    return next(new customError("Record not found", 404));
  }

  // Check if the record belongs to the authenticated user
  if (!record.userId.equals(req.user._id)) {
    return next(
      new customError("You do not have permission to access this record", 403)
    );
  }

  res.status(200).json({
    status: "success",
    data: { record },
  });
});

exports.updateRecord = asyncErrorHandler(async (req, res, next) => {
  const { kanbanRecords } = req.body;

  const recordId = req.params.recordId;

  const record = await Record.findById(recordId);

  if (!record) {
    return next(new customError("Record not found", 404));
  }

  if (!record.userId.equals(req.user._id)) {
    return next(
      new customError("You do not have permission to update this record", 403)
    );
  }

  const updatedRecord = await Record.findByIdAndUpdate(recordId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: { record: updatedRecord },
  });
});

exports.deleteRecord = asyncErrorHandler(async (req, res, next) => {
  const recordId = req.params.recordId;

  const record = await Record.findById(recordId);
  if (!record) {
    return next(new customError("Record not found", 404));
  }

  if (!record.userId.equals(req.user._id)) {
    return next(
      new customError("You do not have permission to delete this record", 403)
    );
  }

  await Record.findByIdAndDelete(recordId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
