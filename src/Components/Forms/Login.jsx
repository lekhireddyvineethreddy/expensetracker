import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Here you can add your logic to handle login
    // For demonstration purposes, let's just log the email and password
    console.log("Email:", email);
    console.log("Password:", password);

    // Clear form inputs on successful login
    setEmail('');
    setPassword('');
    setErrorMessage('');
    alert("User has successfully logged in!");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    // Here you can add your logic to handle forgot password
    // For demonstration purposes, let's just log the email
    console.log("Forgot Password for email:", email);

    // Clear form inputs on forgot password action
    setEmail('');
    setPassword('');
    setErrorMessage('');
    alert("A password reset link has been sent to your email.");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Login</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="forgot-password">
          <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      <div className='Signup-attach'>
        <p>Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
