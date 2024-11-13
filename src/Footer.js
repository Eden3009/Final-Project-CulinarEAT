import React from 'react';
import './css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line"></div> 
      <div className="footer-content">
        {/* Logo/Text Section */}
        <div className="footer-logo-section">
          <h1 className="le-text">L&E</h1>  {/* Matches .le-text in CSS */}
          <h2 className="culinareat-text">CulinarEAT</h2>  {/* Matches .culinareat-text in CSS */}
          <p className="lia-eden-text">BY LIA & EDEN</p>  {/* Matches .lia-eden-text in CSS */}
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CulinarEAT by Lia & Eden. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
