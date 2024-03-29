import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Here you can add your logic to handle signup without Firebase
    // For demonstration purposes, let's just log the email and password
    console.log("Email:", email);
    console.log("Password:", password);

    // Clear form inputs on successful signup
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    alert("User has successfully signed up!");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Signup</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSignup}>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      <div className='Login-attach'>
        <p>Already have an account? <a href="#">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
