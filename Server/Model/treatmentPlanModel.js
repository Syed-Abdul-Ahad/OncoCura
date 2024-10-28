const mongoose = require('mongoose');

const treatmentPlanSchema = new mongoose.Schema({
  recordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record', // Reference to Record
    required: true
  },
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'done'],
    default: 'to-do'
  },
  content: {
    type: String,
    required: true // Stores the AI-generated plan details
  }
}, { timestamps: true });

const TreatmentPlan = mongoose.model('TreatmentPlan', treatmentPlanSchema);
module.exports = TreatmentPlan;
