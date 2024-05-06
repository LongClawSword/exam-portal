const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  examId: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  totalMarksObtained: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Result', ResultSchema);