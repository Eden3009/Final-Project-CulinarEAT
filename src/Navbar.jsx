import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import logo from './logo.png';

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
    fontFamily: "'Poppins', sans-serif",
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  logoutButton: {
    backgroundColor: 'red',
    color: '#FFF',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5001/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null); // Clear user context
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarLogo}>
        <Link to="/">
          <img src={logo} alt="Culinareat Logo" style={styles.logoImage} />
        </Link>
      </div>
      <div style={styles.navbarContent}>
        {!user ? (
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
              Profile
            </Link>
            <Link to="/shopping-list" style={styles.navbarLink}>
              Shopping List
            </Link>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
