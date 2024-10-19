import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirectHandler = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginRedirect = async () => {
      try {
        const response = await fetch('https://mysterious-beginning-ef3abfb64de0.herokuapp.com/auth/callback');
        const data = await response.json();

        if (data.token) {
          // Store the JWT in local storage
          localStorage.setItem('token', data.token);
          onLogin(true); // Notify the parent component about the successful login
          navigate('/chat'); // Redirect to the chat page or appropriate route
        } else {
          console.error('Login failed: No token received');
        }
      } catch (error) {
        console.error('Error during GitHub login redirect:', error);
      }
    };

    handleLoginRedirect();
  }, [navigate, onLogin]);

  return <div>Loading...</div>;
};

export default LoginRedirectHandler;