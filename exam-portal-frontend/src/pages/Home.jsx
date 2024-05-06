// Welcome to the Home Page
// Please select a role to continue
// Student
// Admin
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleRoleSelection = (role) => {
    // Handle role selection logic here
    if (role === 'student') {
      navigate('/student-login');
    }
    if (role === 'admin') {
      navigate('/admin-login');
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Please select a role to continue:</p>
      <button onClick={() => handleRoleSelection('student')}>Student</button>
      <button onClick={() => handleRoleSelection('admin')}>Admin</button>
    </div>
  );
};

export default Home;