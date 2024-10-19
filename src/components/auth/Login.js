import React from 'react';

const Login = ({ onLogin }) => {
  const handleGithubLogin = () => {
    window.location.href = 'https://mysterious-beginning-ef3abfb64de0.herokuapp.com/auth/github';
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGithubLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;
