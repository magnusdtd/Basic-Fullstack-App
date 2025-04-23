import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main({ loggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (if applicable) and navigate to login page
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {loggedInUser}!</h2>
      <p>This is the main page of the application.</p>
      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Logout
      </button>
    </div>
  );
}

export default Main;