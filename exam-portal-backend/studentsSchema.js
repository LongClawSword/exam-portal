const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Note: In a real application, you should hash the password before storing it
  examsAttempted: [{
    examId: mongoose.Schema.Types.ObjectId,
}],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;