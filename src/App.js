// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Chat from './Chat';
import LoginRedirectHandler from './LoginRedirectHandler';
import './App.css';

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
        <Router basename="/react-chat-app"> {/* Set the basename here */}
            <div className="container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                        <Routes>
                            <Route path="/" element={isAuthenticated ? (
                                <div>
                                    <h2>Chat Application</h2>
                                    <Chat onLogout={handleLogout} />
                                </div>
                            ) : (
                                    <Login onLogin={handleLogin} />
                                )} />
                            <Route path="/auth/callback" element={<LoginRedirectHandler onLogin={handleLogin} />} />
                        </Routes>
                    )}
            </div>
        </Router>
    );
};

export default App;

