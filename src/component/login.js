// src/Login.js
import React, { useState } from 'react';
import '../css/login.css'; 
import { validateUser, saveUser } from '../userdatabase';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap/Button';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegistered) {
      if (validateUser(username, password)) {
        setMessage('Login successful!');
      } else {
        setMessage('Invalid username or password.');
      }
    } else {
      saveUser(username, password);
      setMessage('User registered successfully! Please log in.');
      setIsRegistered(true);
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>{isRegistered ? 'Login' : 'Register'}</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button variant="contained" color='primary'>{isRegistered ? 'Sign In' : 'Register'}</button>
        {message && <p>{message}</p>}
        <button className="btn btn-sucess" onClick={() => setIsRegistered(!isRegistered)}>
        {isRegistered ? 'Need to register?' : 'Already registered?'}
      </button>
  
      </form>
      
     
    </div>
  );
};

export default Login;
