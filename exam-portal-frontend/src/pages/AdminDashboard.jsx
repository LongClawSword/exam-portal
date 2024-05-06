// Welcome to the Admin Dshboard page
// Button: Logout 
// When the Logout button is clicked, the user should be redirected to the Admin Login page
// Button: Create Exam
// When Create Exam button is clicked, the user should be redirected to the AdminCreateExam page
// Heading: Live Exams
// Make an api request to the server to get all the exams
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/admin-view-exams`);
      setExams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    // Redirect to Admin Login page
    navigate(`/admin-login`);
  };

  const handleCreateExam = () => {
    // Redirect to AdminCreateExam page
    navigate(`/admin-create-exam`);
  };

  const handleViewSubmissions = (examId) => {
    navigate(`/admin-submissions/${examId}`);
  };

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCreateExam}>Create Exam</button>
      <h1>Live Exams</h1>
      {/* Render the exams */}
      {exams.map((exam) => (
        <div key={exam._id}>
          <h3>{exam.name}</h3>
          <p>{exam.subject}</p>
          <p>{exam.duration}</p>
          <p>{exam.totalMarks}</p>
          <button onClick={() => handleViewSubmissions(exam._id)}>View Submission</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;