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

      {/* Center section: Links */}
      <ul className={isLoggedIn ? "navbar-links navbar-links-logged" : "navbar-links navbar-links-not-logged"}>
        {isLoggedIn ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/add-recipe">Add Recipe</Link></li>
            <li><Link to="/shopping-list">Shopping List</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/chatbot">Chatbot</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>

      {/* Right section: Search bar and Logout button */}
      <div className="right-section">
        <div className="search-bar">
          <input type="text" placeholder="Search recipes..." />
          <button type="submit">Search</button>
        </div>
        {isLoggedIn && (
          <button className="logout-button" onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
