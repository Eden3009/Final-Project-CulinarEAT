import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './css/LoginPage.css';  // Ensure this points to your LoginPage.css
import logo from './logo.png';  // Ensure this points to your logo image

function LoginPage({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({
        UserName: '',
        Password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();  // Initialize navigate for redirection

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputErrors = validate();
        if (Object.keys(inputErrors).length === 0) {
            // Simulate login action (in a real app, you would check the credentials here)
            console.log('Form data submitted:', formData);
            setIsLoggedIn(true);  // Update the app state to log the user in
            navigate('/');  // Redirect to the homepage after login
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
                </div>
            </div>

            {/* Right side image */}
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
