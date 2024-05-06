import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StudentExam = () => {
  const { studentId, examId } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:5001/api/student-exam/${examId}`)
      .then(response => response.json())
      .then(data => {
        setExam(data);
        return data.questionIds;
      })
      .then(questionIds => {
        return Promise.all(questionIds.map(id =>
          fetch(`http://localhost:5001/api/student-question/${id}`)
            .then(response => response.json())
        ));
      })
      .then(questionsData => {
        setQuestions(questionsData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [examId]);

  const handleSaveAnswer = (studentId, questionId, index) => {
    const answerText = document.getElementById(`answer${index}`).value;

    fetch('http://localhost:5001/api/student-save-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, questionId, answerText, examId: exam._id }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleSubmit = () => {
    // Gather all the answers...
    // Send the answers to the server...
    fetch(`http://localhost:5001/api/exams/${exam._id}/add-student-attempted`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });

    fetch(`http://localhost:5001/api/students/${studentId}/add-exam-attempted`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examId: exam._id,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
    navigate(`/student-dashboard/${studentId}`);
  };


  if (!exam) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Exam Name: {exam.name}</h1>
      <p>Subject: {exam.subject}</p>
      <p>Duration: {exam.duration}</p>
      <p>Total Marks: {exam.totalMarks}</p>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.questionText} (Marks: {question.marks})</p>
          <input type="text" id={`answer${index}`} placeholder='Write your answer' />
          <button onClick={() => handleSaveAnswer(studentId, question._id, index)}>Save Answer</button>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StudentExam;