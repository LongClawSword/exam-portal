const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  correctAnswer: { // Add this field
    type: String,
    required: true,
  },
  marks: { // Add this field
    type: Number,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;