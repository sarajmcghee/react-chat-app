// src/App.js 
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Use HashRouter for GitHub Pages
import LandingPage from './components/LandingPage';  // Import the Landing Page component
import Chat from './components/Chat';
import LoginRedirectHandler from './components/auth/LoginRedirectHandler';
import './styles/App.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="container"> {/* This container should have proper styling */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? (
                <>
                  <h2>Chat Application</h2>
                  <Chat onLogout={handleLogout} />
                </>
              ) : (
                <LandingPage />  
              )}
            />
            <Route
              path="/auth/callback"
              element={<LoginRedirectHandler onLogin={handleLogin} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
