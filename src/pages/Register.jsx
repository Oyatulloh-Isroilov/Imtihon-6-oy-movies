import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/register.css'

function Register({ setUserData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email address is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!passwordConfirm) {
      setPasswordConfirmError('Please confirm your password');
      isValid = false;
    } else if (password !== passwordConfirm) {
      setPasswordConfirmError('Passwords do not match');
      isValid = false;
    } else {
      setPasswordConfirmError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const token = { email, password };
      localStorage.setItem('token', JSON.stringify(token));
      setUserData(token.email && token.password);
      navigate('/login');
    }
  };

  return (
    <div className="register">
      <div className='registerPage'>
        <div className="headerLogo">
          <img src="./movie.svg" alt="" />
        </div>
        <div className="regHeroMenu">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="regInps">
              <input type="text" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
              {emailError && <span className="error">{emailError}</span>}
              <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              {passwordError && <span className="error">{passwordError}</span>}
              <input type="password" placeholder='Repeat Password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
              {passwordConfirmError && <span className="error">{passwordConfirmError}</span>}
            </div>
            <button type="submit" className='registerAccBtn'>Create a account</button>
          </form>
          <div className="accNo">
            <p className='noAcc'>Already have an account?</p><Link className='loginBtn' to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
