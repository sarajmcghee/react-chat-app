import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirectHandler = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginRedirect = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        // Replace the old token with the new one
        localStorage.setItem('token', token);

        // Notify the parent component that login was successful
        onLogin(true);

        // Navigate to the chat page
        navigate('/chat');
      } else {
        console.error('Token not found in the URL');
      }
    };

    handleLoginRedirect();
  }, [navigate, onLogin]);

  return <div>Loading...</div>;
};

export default LoginRedirectHandler;
