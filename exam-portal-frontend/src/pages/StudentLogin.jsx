// Welcome to the Student Login Page
// Input: Email
// Input: Password
// Button: Login
// If you are not a student then Button: Register
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Perform login logic here
    fetch('http://localhost:5001/api/student-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (!response.ok) {
          // If the HTTP status code is not in the 200-299 range, log the response text
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        // If the HTTP status code is in the 200-299 range, parse the response as JSON
        return response.json();
      })
      .then(data => {
        if (data.error) {
          // Handle error
          console.error(data.error);
        } else {
          // Navigate to the student dashboard with the studentId in the URL
          console.log(data.studentId);
          navigate(`/student-dashboard/${data.studentId}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleRegister = () => {
    // Perform registration logic here
    navigate('/student-register');
  };

  return (
    <div>
      <h1>Welcome to the Student Login Page</h1>
      <br />
      <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
      <br />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
      If you are not registered then <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default StudentLogin;