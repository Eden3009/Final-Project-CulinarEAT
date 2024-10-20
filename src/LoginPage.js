import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/LoginPage.css';  // Ensure this points to your LoginPage.css

function LoginPage({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({
        UserName: '',
        Password: '',
    });

    const [errors, setErrors] = useState({});
    const [apiErrorMessage, setApiErrorMessage] = useState('');  // API error message state
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let inputErrors = {};
        if (!formData.UserName) {
            inputErrors.UserName = 'Username is required';
        }
        if (!formData.Password) {
            inputErrors.Password = 'Password is required';
        }
        return inputErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputErrors = validate();

        if (Object.keys(inputErrors).length === 0) {
            try {
                // Send login request to the backend
                const response = await axios.post('http://localhost:5001/login', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setIsLoggedIn(true);  // Set login state
                setApiErrorMessage('');  // Clear any previous error
                navigate('/');  // Redirect to home page after successful login

            } catch (error) {
                // Handle invalid login
                if (error.response && error.response.status === 401) {
                    setApiErrorMessage('Invalid username or password.');
                } else {
                    setApiErrorMessage('The user name or password are not correct.');
                    console.error('Login error:', error);
                }
            }
        } else {
            setErrors(inputErrors);
        }
    };

    return (
        <div className="login-page">
            <div className="left-form-container">
                <div className="form-container">
                    <h2>Login to CulinarEAT</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="UserName">Username:</label>
                            <input
                                type="text"
                                id="UserName"
                                name="UserName"
                                value={formData.UserName}
                                onChange={handleChange}
                                required
                            />
                            {errors.UserName && (
                                <div className="error">
                                    <i className="fas fa-exclamation-circle icon"></i>
                                    {errors.UserName}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Password">Password:</label>
                            <input
                                type="password"
                                id="Password"
                                name="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                required
                            />
                            {errors.Password && (
                                <div className="error">
                                    <i className="fas fa-exclamation-circle icon"></i>
                                    {errors.Password}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="submit-button">Login</button>
                    </form>

                    {/* Display API error message with a bounce-in animation */}
                    {apiErrorMessage && (
                        <div className="error-banner bounce-in">
                            <i className="fas fa-exclamation-circle icon"></i>
                            {apiErrorMessage}
                        </div>
                    )}
                </div>
            </div>

            <div className="right-image-container">
                <div className="overlay-text">
                    Glad to see you back! <br />
                    Login to continue your culinary journey.
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
