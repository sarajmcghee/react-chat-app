import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirectHandler = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginRedirect = () => {
      // Extract the token from the URL query string
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');

      if (token) {
        // Store the JWT in local storage
        localStorage.setItem('token', token);
        onLogin(true); // Notify the parent component about the successful login
        navigate('/chat'); // Redirect to the chat page or appropriate route
      } else {
        console.error('Login failed: No token received');
      }
    };

    handleLoginRedirect();
  }, [navigate, onLogin]);

  return <div>Loading...</div>;
};

export default LoginRedirectHandler;
