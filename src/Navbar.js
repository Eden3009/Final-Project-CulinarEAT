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
            <button className="logout-button" onClick={() => setIsLoggedIn(false)}>
              Logout <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>

          {/* Lower navigation bar for additional links and search bar */}
          <div className="bottom-navbar">
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add-recipe">Add Recipe</Link></li>
              <li><Link to="/shopping-list">Shopping List</Link></li>
              <li><Link to="/browse-recipes">Browse Recipes</Link></li>
            </ul>

            {/* Search bar aligned to the right */}
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* For non-logged-in users */}
          <ul className="navbar-links navbar-links-not-logged">
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
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
