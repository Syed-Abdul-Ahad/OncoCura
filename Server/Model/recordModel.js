const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  columnId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const columnSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  taskIds: [String], // Array of task IDs associated with this column
});

const kanbanRecordSchema = new mongoose.Schema({
  columns: [columnSchema],
  tasks: [taskSchema],
});

const recordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    recordName: {
      type: String,
      required: false,
      unique: true,
    },
    analysisResult: {
      type: String,
      required: false,
    },
    summary: {
      type: String,
    },
    kanbanRecords: kanbanRecordSchema,
  },
  { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
