const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./studentsSchema');
const Exam = require('./examSchema');
const Question = require('./questionSchema');
const Answer = require('./answerSchema');
const Result = require('./resultSchema');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/examdb";

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');



    // API Endpoint for saving one question
    app.post('/api/questions', (req, res) => {
      const newQuestion = new Question({
        questionText: req.body.questionText,
        correctAnswer: req.body.correctAnswer, // Add this line
        marks: req.body.marks, // Add this line
      });

      newQuestion.save()
        .then(question => res.json({ id: question._id }))
        .catch(err => res.status(500).json({ error: err.toString() }));
    });



    // API Endpoint for getting a student's name by ID
    app.get('/api/students/:studentId', (req, res) => {
      const studentId = req.params.studentId;

      Student.findById(studentId)
        .then(student => {
          if (!student) {
            res.status(404).json({ error: 'Student not found' });
          } else {
            res.json({ name: student.name });
          }
        })
        .catch(err => res.status(500).json({ error: err.toString() }));
    });





    // API Endpoint for student login
    app.post('/api/student-login', (req, res) => {
      const { email, password } = req.body;

      // Find the student with the provided email
      Student.findOne({ email })
        .then(student => {
          if (!student) {
            // If there's no student with the provided email, send an error message
            return res.status(400).json({ error: 'Invalid email or password' });
          }

          // Check if the provided password matches the one stored in the database
          if (student.password !== password) {
            // If the passwords don't match, send an error message
            return res.status(400).json({ error: 'Invalid email or password' });
          }

          // If the passwords match, send the student's id
          res.json({ studentId: student._id });
        })
        .catch(err => console.error(err));
    });




    // API Endpoint for registering a student
    app.post('/api/student-register', (req, res) => {
      const newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        examsAttempted: req.body.examsAttempted || [],
      });

      newStudent.save()
        .then(() => res.json({ message: 'Student registered successfully' }))
        .catch(err => res.status(500).json({ error: err.toString() }));
    });



    // API Endpoint for fetching all exams
    app.get('/api/student-view-exams', (req, res) => {
      Exam.find()
        .then(exams => res.json(exams))
        .catch(err => res.status(500).json({ error: err.toString() }));
    });



    // API Endpoint for fetching a specific exam by id
    app.get('/api/student-exam/:examId', (req, res) => {
      const { examId } = req.params;

      Exam.findOne({ _id: examId })
        .then(exam => {
          if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
          }

          res.json(exam);
        })
        .catch(err => res.status(500).json({ error: err.toString() }));
    });


    // API Endpoint for fetching a specific question by id
    app.get('/api/student-question/:questionId', (req, res) => {
      const { questionId } = req.params;

      Question.findOne({ _id: questionId })
        .then(question => {
          if (!question) {
            return res.status(404).json({ error: 'Question not found' });
          }

          res.json(question);
        })
        .catch(err => res.status(500).json({ error: err.toString() }));
    });



    // API Endpoint for saving an answer
    // API Endpoint for saving an answer
    app.post('/api/student-save-answer', (req, res) => {
      const { studentId, questionId, answerText, examId } = req.body;

      const answer = new Answer({
        studentId,
        questionId,
        answerText,
        examId
      });

      answer.save()
        .then(() => res.json({ message: 'Answer saved successfully' }))
        .catch(err => res.status(500).json({ error: err.toString() }));
    });



    // API Endpoint for fetching an answer by questionId and studentId
    app.get('/api/admin-view-answer/:questionId/:studentId', (req, res) => {
      const { questionId, studentId } = req.params; // Extract the questionId and studentId from the request parameters

      Answer.findOne({ questionId: questionId, studentId: studentId }) // Find one answer with the questionId and studentId
        .then(answer => {
          if (!answer) { // If no answer is found, return a 404 status code and an error message
            return res.status(404).json({ message: 'Answer not found' });
          }
          res.json(answer); // If the answer is found, return it in the response
        })
        .catch(err => { // If an error occurs, log it and return a 500 status code and the error message
          console.error(err);
          res.status(500).json({ error: err.toString() });
        });
    });



    // API Endpoint for fetching an answer by questionId and studentId for students
    app.get('/api/student-view-answer/:studentId/:questionId', (req, res) => {
      const { questionId, studentId } = req.params; // Extract the questionId and studentId from the request parameters

      Answer.findOne({ questionId: questionId, studentId: studentId }) // Find one answer with the questionId and studentId
        .then(answer => {
          if (!answer) { // If no answer is found, return a 404 status code and an error message
            return res.status(404).json({ message: 'Answer not found' });
          }
          res.json(answer); // If the answer is found, return it in the response
        })
        .catch(err => { // If an error occurs, log it and return a 500 status code and the error message
          console.error(err);
          res.status(500).json({ error: err.toString() });
        });
    });




    // API Endpoint for fetching marks by studentId and examId
    app.get('/api/admin-view-marks/:studentId/:examId', (req, res) => {
      const { studentId, examId } = req.params; // Extract the studentId and examId from the request parameters

      Marks.findOne({ studentId: studentId, examId: examId }) // Find one marks record with the studentId and examId
        .then(marks => {
          if (!marks) { // If no marks record is found, return a 404 status code and an error message
            return res.status(404).json({ message: 'Marks not found' });
          }
          res.json(marks); // If the marks record is found, return it in the response
        })
        .catch(err => { // If an error occurs, log it and return a 500 status code and the error message
          console.error(err);
          res.status(500).json({ error: err.toString() });
        });
    });






    // API Endpoint for fetching a result by examId and studentId
    app.get('/api/view-result/:examId/:studentId', (req, res) => {
      const { examId, studentId } = req.params;

      Result.findOne({ examId, studentId })
        .then(result => {
          if (!result) {
            return res.status(404).json({ message: 'Result not found' });
          }

          res.json(result);
        })
        .catch(err => res.status(500).json({ error: err.toString() }));
    });





    // API Endpoint for publishing result
    app.post('/api/publish-result/:examId/:studentId', (req, res) => {
      const { examId, studentId } = req.params;
      const { totalMarksObtained } = req.body;

      const newResult = new Result({
        examId,
        studentId,
        totalMarksObtained
      });

      newResult.save()
        .then(() => res.json('Result published!'))
        .catch(err => res.status(400).json('Error: ' + err));
    });



    // API Endpoint for fetching a question by id
    app.get('/api/admin-view-question/:questionId', (req, res) => {
      const { questionId } = req.params; // Extract the questionId from the request parameters

      Question.findOne({ _id: questionId }) // Find one question with the _id equal to questionId
        .then(question => {
          if (!question) { // If no question is found, return a 404 status code and an error message
            return res.status(404).json({ message: 'Question not found' });
          }
          res.json(question); // If the question is found, return it in the response
        })
        .catch(err => { // If an error occurs, log it and return a 500 status code and the error message
          console.error(err);
          res.status(500).json({ error: err.toString() });
        });
    });






    // API Endpoint for fetching a question by id
    app.get('/api/admin-view-question/:questionId', (req, res) => {
      const { questionId } = req.params; // Extract the questionId from the request parameters

      Question.findOne({ _id: questionId }) // Find one question with the _id equal to questionId
        .then(question => {
          if (!question) { // If no question is found, return a 404 status code and an error message
            return res.status(404).json({ message: 'Question not found' });
          }
          res.json(question); // If the question is found, return it in the response
        })
        .catch(err => { // If an error occurs, log it and return a 500 status code and the error message
          console.error(err);
          res.status(500).json({ error: err.toString() });
        });
    });



    // API Endpoint for fetching exams attempted by a student by studentId
    app.get('/api/student-exams/:studentId', (req, res) => {
      const { studentId } = req.params;

      Student.findOne({ _id: studentId })
        .then(student => {
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }

          // Assuming examsAttempted is an array of exam ids
          Exam.find({ _id: { $in: student.examsAttempted } })
            .then(exams => res.json(exams))
            .catch(err => res.status(500).json({ error: err.toString() }));
        })
        .catch(err => res.status(500).json({ error: err.toString() }));
    });



    // API Endpoint for saving an exam
    app.post('/api/admin-create-exams', (req, res) => {
      const newExam = new Exam({
        name: req.body.name,
        duration: req.body.duration,
        subject: req.body.subject,
        totalMarks: req.body.totalMarks,
        questionIds: req.body.questionIds,
        studentIds: req.body.studentIds || [],
      });

      newExam.save()
        .then(() => res.json({ message: 'Exam created successfully' }))
        .catch(err => console.error(err));
    });



    // API Endpoint for fetching all exams
    app.get('/api/admin-view-exams', (req, res) => {
      Exam.find()
        .then(exams => res.json(exams))
        .catch(err => res.status(500).json({ error: err.toString() }));
    });



    // API Endpoint for fetching an exam by id
    app.get('/api/admin-view-exams/:examId', (req, res) => {
      const { examId } = req.params;

      Exam.findOne({ _id: examId })
        .then(exam => {
          if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
          }
          res.json(exam);
        })
        .catch(err => {
          console.error(err); // Log the error
          res.status(500).json({ error: err.toString() });
        });
    });


    // API Endpoint for updating a exam's studentIds array
    app.put('/api/exams/:examId/add-student-attempted', async (req, res) => {
      const examId = req.params.examId;
      const studentId = req.body.studentId;

      try {
        const exam = await Exam.findById(examId);
        if (!exam) {
          return res.status(404).json({ error: 'Exam not found' });
        }

        // Add the studentId to the studentsAttempted array
        if (!exam.studentIds.includes(studentId)) {
          exam.studentIds.push(studentId);
        }

        // Save the updated exam
        const updatedExam = await exam.save();

        res.json(updatedExam);
      } catch (err) {
        console.error('Error updating exam', err);
        res.status(500).json({ error: err.toString() });
      }
    });








    // API Endpoint for updating a student's examsAttempted array
    app.put('/api/students/:studentId/add-exam-attempted', async (req, res) => {
      const studentId = req.params.studentId;
      const examId = req.body.examId;

      try {
        const student = await Student.findById(studentId);
        if (!student) {
          return res.status(404).json({ error: 'Student not found' });
        }

        // Add the examId to the examsAttempted array
        if (!student.examsAttempted.includes(examId)) {
          student.examsAttempted.push(examId);
        }

        // Save the updated student
        const updatedStudent = await student.save();

        res.json(updatedStudent);
      } catch (err) {
        console.error('Error updating student', err);
        res.status(500).json({ error: err.toString() });
      }
    });





    app.listen(port, err => {
      if (err) {
        console.error('Error starting server', err);
        return;
      }
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });