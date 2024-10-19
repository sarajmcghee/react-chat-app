// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'; // Import both BrowserRouter and HashRouter
import Login from './Login';
import Chat from './Chat';
import LoginRedirectHandler from './LoginRedirectHandler';
import './App.css';

const isLocalhost = window.location.hostname === 'localhost';

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

    // Dynamically switch between BrowserRouter and HashRouter
    const RouterComponent = isLocalhost ? BrowserRouter : HashRouter;

    return (
        <RouterComponent basename={isLocalhost ? '/' : '/react-chat-app'}>
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
        </RouterComponent>
    );
};

export default App;
