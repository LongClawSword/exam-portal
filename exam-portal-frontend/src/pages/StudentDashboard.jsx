// Welcome to the Student Dashboard
// Button: Logout
// When the Logout button is clicked, the user should be redirected to the Student Login page
// Heading: Live Exams
// Make an api request to the server to get all the exams
// List all the exams with a take exam button
// Attempted Exams
// Make an api request to the server to get all the exams attempted by the student
// List all the exams with a view result button
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [exams, setExams] = useState([]);
  const [attemptedExams, setAttemptedExams] = useState([]);

  useEffect(() => {
    // Fetch all exams
    fetch('http://localhost:5001/api/student-view-exams')
      .then(response => response.json())
      .then(data => {
        setExams(data);
      })
      .catch(error => {
        console.error('Error fetching exams:', error);
      });
  });

  // Fetch attempted exams
  useEffect(() => {
    // Fetch exams attempted by the student
    fetch(`http://localhost:5001/api/student-exams/${studentId}`)
      .then(response => response.json())
      .then(data => {
        setAttemptedExams(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [studentId]); // Include studentId in the dependency array to refetch when it changes

  const handleLogout = () => {
    // Redirect to Student Login page
    navigate('/student-login');
  };

  const handleTakeExam = exam => {
    // Redirect to the Exam page
    navigate(`/student-exam/${studentId}/${exam._id}`);
  }

  return (
    <div>
      <h1>Welcome to the Student Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Live Exams</h2>
      {exams.map(exam => (
        <div key={exam._id}>
          <h3>{exam.name}</h3>
          <p>Duration: {exam.duration}</p>
          <p>Subject: {exam.subject}</p>
          <p>Total Marks: {exam.totalMarks}</p>
          <button onClick={() => handleTakeExam(exam)}>Take Exam</button>
        </div>
      ))}

      <h2>Attempted Exams</h2>
      {attemptedExams.map(exam => (
        <div key={exam._id}>
          <h3>{exam.name}</h3>
          <p>Duration: {exam.duration}</p>
          <p>Subject: {exam.subject}</p>
          <p>Total Marks: {exam.totalMarks}</p>
          <button onClick={() => navigate(`/student-exam-result/${studentId}/${exam._id}`)}>View Result</button>
        </div>
      ))}
    </div>
  );
};

export default StudentDashboard;
