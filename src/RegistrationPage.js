import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationPage.css';

function RegistrationPage() {
    const [formData, setFormData] = useState({
        FName: '',
        LName: '',
        Email: '',
        UserName: '',
        Password: '',
        Role: 'BasicUser',
        Area: 'North',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [apiErrorMessage, setApiErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        let inputErrors = { ...errors };

        if (name === 'FName' || name === 'LName') {
            if (!/^[a-zA-Z\s]+$/.test(value)) {
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
        } else if (!/^[a-zA-Z\s]+$/.test(formData.FName)) {
            inputErrors.FName = 'First name must not contain numbers or special characters';
        }

        if (!formData.LName) {
            inputErrors.LName = 'Last name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.LName)) {
            inputErrors.LName = 'Last name must not contain numbers or special characters';
        }

        if (!formData.Email) {
            inputErrors.Email = 'Email is required';
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.Email)) {
            inputErrors.Email = 'Email is invalid';
        }

        return inputErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputErrors = validate();

        if (Object.keys(inputErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5001/register', formData, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                setSuccessMessage('Registration successful!');
                setApiErrorMessage('');
                console.log(response.data);
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        if (error.response.data.message === 'Email already exists') {
                            setErrors({ Email: 'Email already exists. Please use a different email.' });
                        } else if (error.response.data.message === 'Username already exists') {
                            setErrors({ UserName: 'Username already exists. Please choose a different username.' });
                        } else {
                            setApiErrorMessage('An error occurred. Please try again.');
                        }
                    } else if (error.response.status === 500) {
                        setApiErrorMessage('A server error occurred. Please try again.');
                    }
                } else {
                    setApiErrorMessage('An error occurred. Please try again.');
                    console.error('Error registering user:', error);
                }
            }
        } else {
            setErrors(inputErrors);
        }
    };

    return (
        <div className="registration-page">
            <div className="left-form-container">
                <div className="form-container">
                    <h2>Personalize your experience</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="FName">First Name:</label>
                            <input type="text" id="FName" name="FName" value={formData.FName} onChange={handleChange} required />
                            {errors.FName && <div className="error">{errors.FName}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="LName">Last Name:</label>
                            <input type="text" id="LName" name="LName" value={formData.LName} onChange={handleChange} required />
                            {errors.LName && <div className="error">{errors.LName}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Email">Email:</label>
                            <input type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} required />
                            {errors.Email && <div className="error">{errors.Email}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="UserName">Username:</label>
                            <input type="text" id="UserName" name="UserName" value={formData.UserName} onChange={handleChange} required />
                            {errors.UserName && <div className="error">{errors.UserName}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Password">Password:</label>
                            <input type="password" id="Password" name="Password" value={formData.Password} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Area">Area:</label>
                            <select id="Area" name="Area" value={formData.Area} onChange={handleChange} required>
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

                    {successMessage && <div className="success">{successMessage}</div>}
                    {apiErrorMessage && <div className="error">{apiErrorMessage}</div>}
                </div>
            </div>

            <div className="right-image-container">
                <div className="overlay-text">
                    Glad to meet you! <br />
                    You're just a few clicks away from the most immersive online culinary experience.
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
