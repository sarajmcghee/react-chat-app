import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Use Navigate for redirects
import LandingPage from './components/LandingPage';  
import Chat from './components/Chat';
import LoginRedirectHandler from './components/auth/LoginRedirectHandler';
import './styles/App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper function to decode the JWT using atob
  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = decodeToken(token); // Use atob-based decoding
      const currentTime = Date.now() / 1000; // Current time in seconds

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        // Token is expired, remove it and redirect to landing page
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } else {
        // Token is still valid
        setIsAuthenticated(true);
      }
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
      <div className="container">
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
            {/* Redirect to landing page if not authenticated */}
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
