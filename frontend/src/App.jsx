import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); 

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h3>Welcome to the App</h3>
                <Link to="/login">
                  <button style={{ marginRight: '1rem' }}>Login</button>
                </Link>
                <Link to="/register">
                  <button>Register</button>
                </Link>
              </div>
            }
          />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/main"
            element={
              loggedInUser ? (
                <Main loggedInUser={loggedInUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
