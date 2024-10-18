import React, { useState } from 'react';
import axios from 'axios';
import PasswordField from './PasswordField'; // Adjust the path if necessary

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.data.auth) {
        localStorage.setItem('token', response.data.token);
        onLogin(true);
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{
            width: '90%', // Ensure full width
            height: '40px',
            borderRadius: '5px',
            border: '1px solid #495057', // Match with other inputs
            marginBottom: '10px', // Space between fields
            backgroundColor: 'white', // Set background color to white
            color: '#000000', // Set text color to black
          }}
        />
        <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
