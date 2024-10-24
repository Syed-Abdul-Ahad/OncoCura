const Record = require('./../Model/recordModel');
const asyncErrorHandler = require('./../utils/asyncErrorHandler')

exports.createRecord = asyncErrorHandler(async (req, res) => {
    
    const { userId, recordName, analysisResult, kanbanRecords, createBy } = req.body;

    const newRecord = await Record.create({
      userId,
      recordName,
      analysisResult,
      kanbanRecords,
      createBy,
    });

    res.status(201).json({
      status: 'success',
      data: newRecord,
    });
});


exports.getRecords = asyncErrorHandler(async (req, res) => {
    const records = await Record.find();
    res.status(200).json({
      status: 'success',
      data:{
        records
      }
    });
});
