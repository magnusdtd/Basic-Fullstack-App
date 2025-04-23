import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import api from './services/api.js';

const App = () => {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    api.get('/api/hello') 
      .then((res) => {
        setMessage(res.data.message);
      });
  }, []);
  
  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h2>{message}</h2>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
