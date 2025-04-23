import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api'; 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/register', { username, password });
      setMessage(response.data.message);
      setTimeout(() => navigate('/'), 2000); 
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.detail || 'Bad request. Please check your input.');
      } else {
        setMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;