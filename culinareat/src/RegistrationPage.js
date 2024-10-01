import React, { useState } from 'react';
import './RegistrationPage.css';
import logo from './logo.png'; // Ensure this points to your logo image

function RegistrationPage() {
    const [formData, setFormData] = useState({
        FName: '',
        LName: '',
        Email: '',
        UserName: '',
        Password: '',
        Role: 'BasicUser',  // Default and only role
        Area: 'North',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Real-time validation
        let inputErrors = { ...errors };

        if (name === 'FName' || name === 'LName') {
            if (!/^[a-zA-Z]+$/.test(value)) {
                inputErrors[name] = `${name === 'FName' ? 'First name' : 'Last name'} must not contain numbers or special characters`;
            } else {
                delete inputErrors[name];
            }
        }

        if (name === 'Email') {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(value)) {
                inputErrors.Email = 'Email is invalid';
            } else {
                delete inputErrors.Email;
            }
        }

        setErrors(inputErrors);
    };

    const validate = () => {
        let inputErrors = {};
        if (!formData.FName) {
            inputErrors.FName = 'First name is required';
        } else if (!/^[a-zA-Z]+$/.test(formData.FName)) {
            inputErrors.FName = 'First name must not contain numbers or special characters';
        }

        if (!formData.LName) {
            inputErrors.LName = 'Last name is required';
        } else if (!/^[a-zA-Z]+$/.test(formData.LName)) {
            inputErrors.LName = 'Last name must not contain numbers or special characters';
        }

        if (!formData.Email) {
            inputErrors.Email = 'Email is required';
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.Email)) {
            inputErrors.Email = 'Email is invalid';
        }

        return inputErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputErrors = validate();
        if (Object.keys(inputErrors).length === 0) {
            console.log('Form data submitted:', formData);
            // Proceed with form submission logic
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

            {/* Navigation Bar */}
            <div className="nav-bar">
                <ul>
                    <li><a href="/new-in">New In</a></li>
                    <li><a href="/popular">Popular</a></li>
                    <li><a href="/my-recipes">My Recipes</a></li>
                    <li><a href="/shopping-cart">Shopping Cart</a></li>
                </ul>
            </div>

            {/* Registration Form */}
            <div className="registration-container">
                <h2>Registration to CulinarEAT</h2>
                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-group">
                        <label htmlFor="FName">First Name:</label>
                        <input
                            type="text"
                            id="FName"
                            name="FName"
                            value={formData.FName}
                            onChange={handleChange}
                            required
                        />
                        {errors.FName && <span className="error">{errors.FName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="LName">Last Name:</label>
                        <input
                            type="text"
                            id="LName"
                            name="LName"
                            value={formData.LName}
                            onChange={handleChange}
                            required
                        />
                        {errors.LName && <span className="error">{errors.LName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="Email">Email:</label>
                        <input
                            type="email"
                            id="Email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                        />
                        {errors.Email && <span className="error">{errors.Email}</span>}
                    </div>

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
                    </div>

                    <div className="form-group">
                        <label htmlFor="Area">Area:</label>
                        <select
                            id="Area"
                            name="Area"
                            value={formData.Area}
                            onChange={handleChange}
                            required
                        >
                            <option value="North">North</option>
                            <option value="Center">Center</option>
                            <option value="Jerusalem">Jerusalem</option>
                            <option value="South">South</option>
                            <option value="Judea and Samaria">Judea and Samaria</option>
                            <option value="Abroad">Abroad</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-button">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage;
