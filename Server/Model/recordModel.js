const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  recordName: {
    type: String,
    required: true,
  },
  analysisResult: {
    type: String,
    required: true,
  },
  kanbanRecords: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
}, { timestamps: true },  // Adds createdAt and updatedAt fields automatically
{
    collection:'Record'
}); 

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
