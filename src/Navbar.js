import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';  // Add your Navbar styles here

function Navbar({ isLoggedIn }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Culinareat</Link>  {/* Home Page */}
      </div>
      
      {/* Search Bar in the header for both guest and registered users */}
      <div className="search-bar">
        <input type="text" placeholder="Search recipes..." />
        <button type="submit">Search</button>
      </div>

      <ul className="navbar-links">
        {/* Guest users */}
        {!isLoggedIn ? (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          /* Registered users */
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/add-recipe">Add Recipe</Link></li>
            <li><Link to="/shopping-list">Shopping List</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/chatbot">Chatbot</Link></li>
            <li><Link to="/logout" onClick={() => window.location.reload()}>Logout</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
