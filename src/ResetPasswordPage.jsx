import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import pic3 from './images/resetpassword.jpeg';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles


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
    marginBottom: '10px',
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
  errorMessageContainer: {
    minHeight: '20px',
    marginBottom: '10px',
  },
  errorMessage: {
    color: '#d9534f',
    fontSize: '14px',
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
    marginTop: '10px',
    fontWeight: 'bold',
    fontFamily: "'Merienda', cursive",
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#b25949',
    transform: 'scale(1.05)',
  },
  messageContainer: {
    minHeight: '60px', // Increased height to accommodate larger messages
    marginTop: '20px',
  },
  successMessage: {
    color: '#28a745',
    fontSize: '16px', // Larger font size for success message
    fontWeight: '600',
    fontFamily: "'Poppins', sans-serif",
  },
  navigateMessage: {
    color: '#6c757d',
    fontSize: '18px', // Larger font size for navigation message
    fontWeight: '600',
    marginTop: '10px',
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

function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.trim() === '') {
      setError('');
      setSuccess('');
    } else if (!validateEmail(value)) {
      setError('Please enter a valid email address.');
      setSuccess('');
    } else {
      setError('');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
  
    toast.success('Password reset instructions have been sent to your email. ', {
      position: 'top-center',
      autoClose: 5000,
    });
  
    // Navigate to login screen after 5 seconds
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  };
  
  return (
    <div style={styles.page}>
      <ToastContainer />
      <div style={styles.formContainer}>
        <div style={styles.formBox}>
          <h1 style={styles.header}>Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <div style={styles.group}>
              <label style={styles.label} htmlFor="email">Email:</label>
              <input
                style={styles.input}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.errorMessageContainer}>
              {error && <div style={styles.errorMessage}>{error}</div>}
            </div>
            <button
              style={{
                ...styles.button,
                ...(isHovering ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              type="submit"
            >
              Reset Password
            </button>
            <div style={styles.messageContainer}>
              {success && (
                <>
                  <div style={styles.successMessage}>{success}</div>
                  <div style={styles.navigateMessage}> you will navigate back to Login Screen in 5 seconds.</div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <div style={styles.overlayText}>
          Enter your email to receive password reset instructions.
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
