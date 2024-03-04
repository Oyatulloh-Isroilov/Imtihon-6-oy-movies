import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css'

function Login({ setUserData }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const storedToken = JSON.parse(localStorage.getItem('token'));
            if (storedToken && storedToken.email === email && storedToken.password === password) {
                setUserData(storedToken);
                navigate('/');
            } else {
                alert("Email yoki parol xato");
            }
        }
    };

    return (
        <div className="login">
            <div className='loginPage'>
                <div className="headerLogo">
                    <img src="./movie.svg" alt="" />
                </div>
                <div className="logHeroMenu">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="logInps">
                            <input type="text" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                            {emailError && <span className="error">{emailError}</span>}
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            {passwordError && <span className="error">{passwordError}</span>}
                        </div>
                        <button type="submit" className='loginAccBtn'>Login to your account</button>
                    </form>
                    <p className='noAcc'>Don't have an account? <Link className='registerBtn' to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
