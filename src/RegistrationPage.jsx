import React, { useState } from 'react';
import pic3 from './images/pic3.jpeg'; // Import the background image

const styles = {
  page: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    flexDirection: 'row-reverse',
    backgroundColor: '#f9f7f4',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
  },
  formBox: {
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
  },
  header: {
    fontSize: '24px',
    color: '#d77a65',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: 'Georgia' ,
  },
  group: {
    marginBottom: '20px',
    position: 'relative',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  },
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    fontFamily: "'Poppins', sans-serif",
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#d77a65',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  errorMessage: {
    color: '#d9534f',
    fontSize: '13px',
    fontWeight: 'normal',
    position: 'absolute',
    bottom: '-18px',
    left: '5px',
    fontFamily: "'Poppins', sans-serif",
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    backgroundImage: `url(${pic3})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    position: 'absolute',
    color: '#ffffff',
    fontSize: '2rem',
    textAlign: 'center',
    padding: '30px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '12px',
    fontFamily: "'Dancing Script', cursive",
    fontWeight: 'bold', // Make text bold
    width: '80%', // Wider overlay
    maxWidth: '600px',
    animation: 'fadeIn 1s ease-out forwards',
    opacity: 0,
    transform: 'translateY(-20px)',
  },
};

function RegistrationPage() {
  const [formData, setFormData] = useState({
    FName: '',
    LName: '',
    Email: '',
    UserName: '',
    Password: '',
    Area: 'North',
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (value.trim() === '') {
      return ''; // Clear the error if the field is empty
    }

    switch (name) {
      case 'FName':
      case 'LName':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return `${name === 'FName' ? 'First name' : 'Last name'} must not contain numbers or special characters.`;
        }
        break;
      case 'Email':
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
          return 'Please enter a valid email address.';
        }
        break;
      case 'Password':
        if (value.length < 6) {
          return 'Password must be at least 6 characters long.';
        }
        break;
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the current field
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });
  
    setErrors(validationErrors);
  
    // If no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, Role: 'BasicUser' }), // Add Role field
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Failed to register user');
        }
  
        console.log('Registration successful:', data);
        alert('Registration successful! You can now log in.');
        // Optionally reset the form
        setFormData({
          FName: '',
          LName: '',
          Email: '',
          UserName: '',
          Password: '',
          Area: 'North',
        });
      } catch (error) {
        console.error('Error registering user:', error.message);
        setErrors({ general: error.message });
      }
    }
  };
  

  return (
    <div style={styles.page}>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div style={styles.formContainer}>
        <div style={styles.formBox}>
          <h2 style={styles.header}>Welcome to Your Culinary Adventure!</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.group}>
              <label style={styles.label} htmlFor="FName">First Name:</label>
              <input
                style={styles.input}
                type="text"
                id="FName"
                name="FName"
                value={formData.FName}
                onChange={handleChange}
                required
              />
              {errors.FName && <span style={styles.errorMessage}>{errors.FName}</span>}
            </div>
            <div style={styles.group}>
              <label style={styles.label} htmlFor="LName">Last Name:</label>
              <input
                style={styles.input}
                type="text"
                id="LName"
                name="LName"
                value={formData.LName}
                onChange={handleChange}
                required
              />
              {errors.LName && <span style={styles.errorMessage}>{errors.LName}</span>}
            </div>
            <div style={styles.group}>
              <label style={styles.label} htmlFor="Email">Email:</label>
              <input
                style={styles.input}
                type="email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
              {errors.Email && <span style={styles.errorMessage}>{errors.Email}</span>}
            </div>
            <div style={styles.group}>
              <label style={styles.label} htmlFor="UserName">Username:</label>
              <input
                style={styles.input}
                type="text"
                id="UserName"
                name="UserName"
                value={formData.UserName}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.group}>
              <label style={styles.label} htmlFor="Password">Password:</label>
              <input
                style={styles.input}
                type="password"
                id="Password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
              {errors.Password && <span style={styles.errorMessage}>{errors.Password}</span>}
            </div>
            <div style={styles.group}>
              <label style={styles.label} htmlFor="Area">Area:</label>
              <select
                style={styles.select}
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
            <button style={styles.button} type="submit">Register</button>
          </form>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <div style={styles.overlayText}>
          Glad to meet you! <br />
          You're just a few clicks away from the most immersive online culinary experience.
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
