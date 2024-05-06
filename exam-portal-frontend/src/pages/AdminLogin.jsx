// Welcome to the Admin Login Page
// Input: Email
// Input: AdminID
// Input: Password
// Login Button
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [adminID, setAdminID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAdminIDChange = (e) => {
    setAdminID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Perform login logic here
    navigate('/admin-dashboard');
  };

  return (
    <div>
      <h1>Welcome to the Admin Login Page</h1>
      <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
      <br />
      <input type="text" value={adminID} onChange={handleAdminIDChange} placeholder="Admin ID" />
      <br />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;