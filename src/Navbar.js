import React from 'react';
import './css/Navbar.css';  // Navbar-specific styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>RESTAURANT</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/menu">Menu</a></li>
        <li><a href="/templates">Templates</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="navbar-contact">
        <p>Email: reservations@myrestaurant.com</p>
        <p>Phone: 0114 267 9090</p>
      </div>
    </nav>
  );
}

export default Navbar;
