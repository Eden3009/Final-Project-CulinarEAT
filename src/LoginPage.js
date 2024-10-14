import React, { useState } from 'react';
import './RegistrationPage.css';
import logo from './logo.png';  // Ensure this points to your logo image

function LoginPage({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({
        UserName: '',
        Password: '',
    });

    const [errors, setErrors] = useState({});

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
        } else {
            setErrors(inputErrors);
        }
    };

    return (
        <div>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="logo-container">
                    <img src={logo} alt="Culinareat Logo" className="logo" />
                </div>
                <div className="right-icons">
                    <a href="/search">🔍</a>
                    <a href="/favorites">❤️</a>
                    <a href="/home">🏠</a>
                </div>
            </div>

            {/* Login Form */}
            <div className="registration-container">
                <h2>Login to CulinarEAT</h2>
                <form onSubmit={handleSubmit} className="registration-form">
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
                        {errors.UserName && <span className="error">{errors.UserName}</span>}
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
                        {errors.Password && <span className="error">{errors.Password}</span>}
                    </div>

                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
