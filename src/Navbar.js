import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import logo from './logo.png';  // Import your logo image

function Navbar({ isLoggedIn, setIsLoggedIn }) {  // Accept setIsLoggedIn to manage logout
  return (
    <nav className="navbar">
      {/* Left section: Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Culinareat Logo" className="logo" />
        </Link>
      </div>

      {isLoggedIn ? (
        <>
          {/* Centered section for logged-in user */}
          <div className="navbar-actions centered">
            <button className="navbar-button profile-btn">
              <i className="fas fa-user"></i> My Profile
            </button>
            <button className="navbar-button chatbot-btn">
              <i className="fas fa-comments"></i> Open Chatbot
            </button>
            <button className="navbar-button preferences-btn">
              <i className="fas fa-cog"></i> My Preferences
            </button>
            <Link to="/add-recipe" className="navbar-link">Add Recipe</Link>
            <button className="logout-button" onClick={() => setIsLoggedIn(false)}>
              Logout <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* For non-logged-in users */}
          <ul className="navbar-links navbar-links-not-logged">
            <li><Link to="/register" className="navbar-link">Register</Link></li>
            <li><Link to="/login" className="navbar-link">Login</Link></li>
            <li><Link to="/add-recipe" className="navbar-link">Add Recipe</Link></li>
          </ul>
          {/* Adding search bar for non-logged-in users */}
          <div className="right-section">
            <div className="search-bar">
              <input type="text" placeholder="Search recipes..." />
              <button type="submit">Search</button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
