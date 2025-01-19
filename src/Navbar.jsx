import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { FiPlusCircle, FiUser, FiShoppingCart, FiHeart, FiHome, FiLogOut, FiUserPlus } from 'react-icons/fi'; // Import icons
import { HiOutlineUserCircle } from 'react-icons/hi'; // User circle login icon
import logo from './logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  navbar: {
    backgroundColor: '#d2b9af',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    width: '100%',
    fontFamily: "'Poppins', sans-serif",
    borderBottom: '2px solid #bd988a',
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
    gap: '20px',
    marginRight: '15px',
  },
  navbarLink: {
    textDecoration: 'none',
    color: '#7A7673', // Soft muted gray
    backgroundColor: 'transparent',
    border: 'none',
    padding: '10px 12px',
    fontSize: '1.4rem',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  navbarLinkHover: {
    color: '#5C5C5C', // Slightly darker gray on hover
  },
  loginButton: {
    fontSize: '1.6rem', // Larger login button
    padding: '12px 14px',
  },
  logoutButton: {
    fontSize: '1.2rem', // Smaller logout button to match other icons
    padding: '8px 10px',
    marginLeft: '10px', // Optional margin for spacing
  },
};

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    toast.dismiss();
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
        setUser(null);
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

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarLogo}>
      <Link to="/home">
  <img src={logo} alt="Culinareat Logo" style={styles.logoImage} />
</Link>

      </div>

      <div style={styles.navbarContent}>
      <Link
  to="/home"
  style={styles.navbarLink}
  title="Home"
  onMouseEnter={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
  onMouseLeave={(e) => (e.target.style.color = styles.navbarLink.color)}
>
  <FiHome />
</Link>


        {!isLoggedIn ? (
          <>
            {/* Register Icon */}
            <Link
              to="/register"
              style={styles.navbarLink}
              title="Register"
              onMouseEnter={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
              onMouseLeave={(e) => (e.target.style.color = styles.navbarLink.color)}
            >
              <FiUserPlus />
            </Link>

            {/* Login Icon */}
            <Link
              to="/login"
              style={{ ...styles.navbarLink, ...styles.loginButton }}
              title="Login"
              onMouseEnter={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
              onMouseLeave={(e) => (e.target.style.color = styles.navbarLink.color)}
            >
              <HiOutlineUserCircle />
            </Link>
          </>
        ) : (
          <>
            {/* Add Recipe Icon */}
            <Link
              to="/add-recipe"
              style={styles.navbarLink}
              title="Add Recipe"
              onMouseEnter={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
              onMouseLeave={(e) => (e.target.style.color = styles.navbarLink.color)}
            >
              <FiPlusCircle />
            </Link>

            {/* Profile Icon */}
            <Link
              to="/profile"
              style={styles.navbarLink}
              title="Profile"
              onMouseEnter={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
              onMouseLeave={(e) => (e.target.style.color = styles.navbarLink.color)}
            >
              <FiUser />
            </Link>

            {/* Shopping Cart Icon */}
            <Link
              to="/shopping-list"
              style={styles.navbarLink}
              title="Shopping List"
              onMouseEnter={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
              onMouseLeave={(e) => (e.target.style.color = styles.navbarLink.color)}
            >
              <FiShoppingCart />
            </Link>

            {/* Favorites Icon */}
            <Link
              to="/favorites"
              style={styles.navbarLink}
              title="Favorites"
              onMouseEnter={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
              onMouseLeave={(e) => (e.target.style.color = styles.navbarLink.color)}
            >
              <FiHeart />
            </Link>

            {/* Smaller Logout Button */}
            <button
              onClick={handleLogout}
              style={{ ...styles.navbarLink, ...styles.logoutButton }}
              onMouseEnter={(e) => (e.target.style.color = styles.navbarLinkHover.color)}
              onMouseLeave={(e) => (e.target.style.color = styles.navbarLink.color)}
            >
              <FiLogOut /> Log out
            </button>
          </>
        )}
      </div>

      <ToastContainer />
    </nav>
  );
}

export default Navbar;
