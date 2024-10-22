import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/LoginPage.css';  // Make sure the path to your CSS file is correct

function LoginPage({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({
        UserName: '',
        Password: '',
    });

    const [errors, setErrors] = useState({});
    const [apiErrorMessage, setApiErrorMessage] = useState('');  // API error message state
    const navigate = useNavigate();  // For page redirection

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
                    withCredentials: true,  // Important to send cookies with the request
                });

                // If login is successful, update the state and localStorage
                setIsLoggedIn(true);  // Set login state
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', formData.UserName);  // Store username if needed
                setApiErrorMessage('');  // Clear any previous error

                // Redirect to homepage after successful login
                navigate('/');  

            } catch (error) {
                // Handle invalid login (status 401: Unauthorized)
                if (error.response && error.response.status === 401) {
                    setApiErrorMessage('Invalid username or password.');
                } else {
                    setApiErrorMessage('An error occurred during login. Please try again.');
                    console.error('Login error:', error);
                }
            }
        } else {
            setErrors(inputErrors);
        }
    };

    return (
        <div className="login-page">
            {/* Left side login form */}
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

                    {/* Display API error message */}
                    {apiErrorMessage && (
                        <div className="error-banner bounce-in">
                            <i className="fas fa-exclamation-circle icon"></i>
                            {apiErrorMessage}
                        </div>
                    )}
                </div>
            </div>

            {/* Right side background image with text */}
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
