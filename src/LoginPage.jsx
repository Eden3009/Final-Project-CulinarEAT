import React, { useState } from 'react';
import pic3 from './images/loginpic.jpg'; // Import the background image

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
    fontSize: '28px',
    color: '#8b5e3c',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: "'Dancing Script', cursive",
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
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#8b5e3c',
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

function LoginPage({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (value.trim() === '') {
      return `${name} is required.`;
    }

    if (name === 'Password' && value.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

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

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Login successful:', formData);
      setIsLoggedIn(true);
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
          <h1 style={styles.header}>Login</h1>
          <form onSubmit={handleSubmit}>
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
              {errors.UserName && <span style={styles.errorMessage}>{errors.UserName}</span>}
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
            <button style={styles.button} type="submit">Sign In</button>
          </form>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <div style={styles.overlayText}>
          Glad to see you back! <br />
          Login to continue your culinary journey.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
