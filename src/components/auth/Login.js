import React from 'react';

const Login = ({ onLogin }) => {
  const handleGithubLogin = () => {
    window.location.href = 'https://mysterious-beginning-ef3abfb64de0.herokuapp.com/auth/github';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://mysterious-beginning-ef3abfb64de0.herokuapp.com/auth/google';
  };
  
  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGithubLogin}>Login with GitHub</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;



