import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginRedirectHandler = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLoginRedirect = async () => {
      // Extract the token from the hash URL (from the search part after the '?')
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      if (token) {
        console.log('Token found:', token); // Log to check if token is correctly extracted
        // Store the JWT token in local storage
        localStorage.setItem('token', token);

        // Notify the parent component that the user is authenticated
        onLogin(true);

        // Redirect to the chat page or the default logged-in route
        navigate('/');
      } else {
        console.error('Token not found in the URL');
      }
    };

    handleLoginRedirect();
  }, [location.search, navigate, onLogin]);

  return <div>Loading...</div>;
};

export default LoginRedirectHandler;
