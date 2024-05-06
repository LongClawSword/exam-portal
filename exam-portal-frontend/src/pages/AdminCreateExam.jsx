// Input: Exam Name
// Line Break
// Input: Subject
// Line Break
// Input: Duration
// Line Break
// Input: Total Marks
// Line Break
// Input: Question 1
// There should be input for only one question initially
// Line Break
// Button: Add Question
// When Add Question button is clicked, there should be a new input for Question 2 and an api request should be made to save the question in the question collection and the response should be stored 
// Line Break
// Button: Create Exam
// When Create Exam button is clicked, the exam should be created and the user should be redirected to the AdminDashboard page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCreateExam = () => {
  const navigate = useNavigate();
  const [examName, setExamName] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [questions, setQuestions] = useState(['']);
  const [questionIds, setQuestionIds] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(['']);
  const [marks, setMarks] = useState(['']);

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: questions[questions.length - 1],
      correctAnswer: correctAnswers[correctAnswers.length - 1],
      marks: marks[marks.length - 1],
    };

    fetch('http://localhost:5001/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestionIds([...questionIds, data.id]);
        console.log(data);
      })
      .catch((error) => console.error(error));
    setQuestions([...questions, '']);
    setCorrectAnswers([...correctAnswers, '']);
    setMarks([...marks, '']);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleCreateExam = () => {
    const examData = {
      name: examName,
      duration: duration,
      subject: subject,
      totalMarks: totalMarks,
      questionIds: questionIds,
      studentIds: [],
    };
    fetch('http://localhost:5001/api/admin-create-exams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(examData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        navigate('/admin-dashboard'); // Navigate to the exams page
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
        placeholder="Exam Name"
      />
      <br />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <br />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration"
      />
      <br />
      <input
        type="text"
        value={totalMarks}
        onChange={(e) => setTotalMarks(e.target.value)}
        placeholder="Total Marks"
      />
      <br />
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestions([...questions.slice(0, index), e.target.value, ...questions.slice(index + 1)])}
            placeholder={`Question ${index + 1}`}
          />
          <input
            type="text"
            value={correctAnswers[index] || ''}
            onChange={(e) => setCorrectAnswers([...correctAnswers.slice(0, index), e.target.value, ...correctAnswers.slice(index + 1)])}
            placeholder={`Correct Answer ${index + 1}`}
          />
          <input
            type="number"
            value={marks[index] || ''}
            onChange={(e) => setMarks([...marks.slice(0, index), e.target.value, ...marks.slice(index + 1)])}
            placeholder={`Marks ${index + 1}`}
          />
          <br />
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <br />
      <button onClick={handleCreateExam}>Create Exam</button>
    </div>
  );
};

export default AdminCreateExam;