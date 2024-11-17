import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png'; // Import your logo image

const globalStyles = {
  htmlBody: {
    margin: 0,
    padding: 0,
    width: '100%',
    overflowX: 'hidden', // Prevent horizontal scrolling
    boxSizing: 'border-box',
  },
};

const styles = {
  navbar: {
    backgroundColor: '#D6C0B3',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    width: '100%',
    fontFamily: "'Poppins', sans-serif",
    borderBottom: '2px solid #D4AF37',
    boxSizing: 'border-box', // Ensure padding/borders are included in width
    overflowX: 'hidden', // Prevent horizontal scrolling
  },
  navbarLogo: {
    marginRight: 'auto', // Push logo to the far left
  },
  logoImage: {
    width: '120px',
  },
  navbarContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1, // Push content to the right
    gap: '10px', // Reduced gap to bring items closer
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
  navbarLinkHover: {
    backgroundColor: '#D4AF37', // Change background on hover
    color: '#FFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for modern look
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  searchInput: {
    padding: '5px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #D4AF37',
    backgroundColor: '#F9F5F0',
    color: '#333333',
  },
  searchButton: {
    padding: '10px 15px',
    backgroundColor: '#D4AF37',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  searchButtonHover: {
    backgroundColor: '#B58929', // Slightly darker gold
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for button lift
  },
};

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [hoveredLink, setHoveredLink] = useState(null);

  React.useEffect(() => {
    // Apply global styles
    Object.keys(globalStyles.htmlBody).forEach((key) => {
      document.body.style[key] = globalStyles.htmlBody[key];
      document.documentElement.style[key] = globalStyles.htmlBody[key];
    });
  }, []);

  return (
    <nav style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.navbarLogo}>
        <Link to="/">
          <img src={logo} alt="Culinareat Logo" style={styles.logoImage} />
        </Link>
      </div>

      {/* Navbar Content */}
      <div style={styles.navbarContent}>
        {['Register', 'Login', 'Add Recipe'].map((text, index) => (
          <Link
            to={`/${text.toLowerCase().replace(' ', '-')}`}
            key={index}
            style={{
              ...styles.navbarLink,
              ...(hoveredLink === index ? styles.navbarLinkHover : {}),
            }}
            onMouseEnter={() => setHoveredLink(index)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {text}
          </Link>
        ))}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search recipes..."
            style={styles.searchInput}
          />
          <button
            type="submit"
            style={{
              ...styles.searchButton,
              ...(hoveredLink === 'search' ? styles.searchButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredLink('search')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
