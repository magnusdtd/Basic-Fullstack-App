import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main({ loggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (if applicable) and navigate to login page
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 lclassName="text-4xl font-bold"> Welcome, {loggedInUser}!</h1>
        <p className="mt-4 text-lg">  This is the main page of the application.</p>
        <button onClick={handleLogout} className="px-6 py-3 mt-6 text-lg font-medium bg-white text-blue-500 rounded-lg hover:bg-gray-100">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Main;