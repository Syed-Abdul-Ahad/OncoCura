const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recordName: {
    type: String,
    required: true,
    unique: true
  },
  analysisResult: {
    type: String,
    required: true
  },
  kanbanRecords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TreatmentPlan' // Reference to TreatmentPlan
    }
  ]
}, { timestamps: true });

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
