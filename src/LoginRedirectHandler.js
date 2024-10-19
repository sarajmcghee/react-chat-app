import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirectHandler = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginRedirect = async () => {
      const query = new URLSearchParams(window.location.search);
      const token = query.get('token');
      console.log('Token from URL:', token);  // Log to see if the token is extracted correctly
      if (token) {
        // Store the JWT token in localStorage
        localStorage.setItem('token', token);
        onLogin(true);
        navigate('/'); // Redirect to the home/chat page
      } else {
        console.error('No token found in the callback URL');
      }
    };

    handleLoginRedirect();
  }, [navigate, onLogin]);

  return <div>Loading...</div>;
};

export default LoginRedirectHandler;