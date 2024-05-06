const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answerText: {
    type: String,
    required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;