// Welcome to the Student Register Page
// Input: Name
// Input: Email
// Input: Password
// Button: Register
// If you are already a student then Button: Login
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    const newStudent = { name, email, password };
    const response = await fetch('http://localhost:5001/api/student-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });
    if (response.ok) {
      console.log('Student registered successfully');
      navigate('/student-login');
    } else {
      console.error('Failed to register student');
    }
  }

  const handleLogin = () => {
    // Redirect to login page
    navigate('/student-login');
  };

  return (
    <div>
      <h1>Welcome to the Student Register Page</h1>
      <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
      <br />
      <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
      <br />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <br />
      <button onClick={handleRegister}>Register</button>
      <br />
      If you are already a student then <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default StudentRegister;