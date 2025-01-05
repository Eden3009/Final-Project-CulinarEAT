import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { FaPowerOff } from 'react-icons/fa'; // Import a power-off icon
import logo from './logo.png';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const styles = {
  navbar: {
    backgroundColor: '#D6C0B3',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    width: '100%',
    fontFamily: "'Poppins', sans-serif",
    borderBottom: '2px solid #D4AF37',
    boxSizing: 'border-box',
  },
  navbarLogo: {
    marginRight: 'auto',
  },
  logoImage: {
    width: '120px',
  },
  navbarContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  navbarLink: {
    textDecoration: 'none',
    color: '#F9F5F0',
    fontSize: '1rem',
    padding: '10px 15px',
    borderRadius: '5px',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    color: '#FFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '1rem',
    gap: '8px',
  },
  toastButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
    color: '#FFF',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
  cancelButton: {
    backgroundColor: '#D3D3D3',
    color: '#333',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
};

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  // Check if the user is logged in
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    toast.dismiss(); // Dismiss the confirmation toast immediately
    try {
      const response = await fetch('http://localhost:5001/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('You have been logged out successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
        setUser(null); // Clear user context after logout
      } else {
        toast.error('Failed to log out. Please try again.', {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error(`Error during logout: ${error.message}`, {
        position: 'top-center',
      });
    }
  };

  const confirmLogout = () => {
    toast.info(
      <div>
        <p>Are you sure you want to log out?</p>
        <div style={styles.toastButtons}>
          <button style={styles.confirmButton} onClick={handleLogout}>
            Yes
          </button>
          <button
            style={styles.cancelButton}
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false, // Keep the toast open until the user selects an option
        closeButton: false, // Remove default close button
      }
    );
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarLogo}>
        <Link to="/">
          <img src={logo} alt="Culinareat Logo" style={styles.logoImage} />
        </Link>
      </div>

      <div style={styles.navbarContent}>
        {!isLoggedIn ? (
          <>
            <Link to="/register" style={styles.navbarLink}>
              Register
            </Link>
            <Link to="/login" style={styles.navbarLink}>
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/add-recipe" style={styles.navbarLink}>
              Add Recipe
            </Link>
            <Link to="/profile" style={styles.navbarLink}>
              Profile ({user?.UserName || 'User'})
            </Link>
            <Link to="/shopping-list" style={styles.navbarLink}>
              Shopping List
            </Link>
            <Link to="/favorites" style={styles.navbarLink}>
              Favorites
            </Link>
            <Link to="/chatbot" style={styles.navbarLink}>
              Chatbot
            </Link>
            <button
              onClick={confirmLogout}
              style={styles.logoutButton}
            >
              <FaPowerOff /> Logout
            </button>
          </>
        )}
      </div>

      <ToastContainer />
    </nav>
  );
}

export default Navbar;
