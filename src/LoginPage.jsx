import React, { useState, useContext } from 'react'; // Added useContext
import pic3 from './images/loginpic.jpg'; // Import the background image
import { Link } from 'react-router-dom';
import Popup from './Popup'; // Import the Popup component
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Added UserContext import





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
    fontSize: '32px',
    color: '#B55335',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: "'Merienda', cursive",
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
    backgroundColor: '#B55335',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    fontWeight: 'bold',
    fontFamily: "'Merienda', cursive", // Add the same font as the headline
    transition: 'background-color 0.3s ease, transform 0.3s ease',
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
    fontWeight: 'bold',
    width: '80%',
    maxWidth: '600px',
    animation: 'fadeIn 1s ease-out forwards',
    opacity: 0,
    transform: 'translateY(-20px)',
  },
};

function LoginPage({  }) {
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
  });
  const [errors, setErrors] = useState({});
  const [isHovering, setIsHovering] = useState(false); // Track hover state
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(UserContext); // Access directly from UserContext



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

    // Validate input fields
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
          // Fetch API with CORS configuration
          const response = await fetch('http://localhost:5001/login', {
              method: 'POST',
              credentials: 'include', // Ensure credentials are included
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData), // Send user input data
          });

            const data = await response.json();

            if (!response.ok) {
                // Handle login errors
                setErrors({ general: data.message });
                return;
            }

            // Login successful
            console.log('Login successful:', data);
            setIsLoggedIn(true); // Update the logged-in state in context
            setUser(data.user); // Ensure this is the correct user object
            setShowPopup(true); // Show success popup

            // Redirect to homepage after 4 seconds
            setTimeout(() => {
              navigate('/home');
            }, 4000);
          } catch (error) {
            console.error('Error during login:', error);
            setErrors({ general: 'An error occurred. Please try again later.' });
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
<Link
  to="/reset-password"
  style={{
    display: 'block',
    marginTop: '10px',
    fontSize: '14px',
    color: '#B55335',
    textDecoration: 'none',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '500',
    textAlign: 'left',
  }}
>
  Forgot Password?
</Link>
<button
  style={{
    ...styles.button,
    ...(isHovering ? { backgroundColor: '#b25949', transform: 'scale(1.05)' } : {}),
  }}
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
  type="submit"
>
  Sign In
</button>
{errors.general && (
  <div style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>
    {errors.general}
  </div>
)}
          </form>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <div style={styles.overlayText}>
          Glad to see you back! <br />
          Login to continue your culinary journey.
        </div>
      </div>
      <div>
      {showPopup && <Popup message="Login successful! Redirecting to the homepage..." onClose={() => setShowPopup(false)} />}
      {/* Rest of the login form */}
    </div>
    </div>
    
  );
}

export default LoginPage;
