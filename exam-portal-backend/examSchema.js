const mongoose = require('mongoose');

// Model Schema for Exam
// Name
// Duration
// Subject
// Questions ids array
// studentId who attempted the exam
const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    questionIds: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    studentIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
});

module.exports = mongoose.model('Exam', examSchema);