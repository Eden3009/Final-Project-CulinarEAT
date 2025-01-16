import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#d2b9af',
        color: '#333',
        fontFamily: "'Poppins', sans-serif",
        margin: '0',
        padding: '0',
        width: '100%',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Orange Line */}
      <div
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: '#bd988a',
        }}
      ></div>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 0',
        }}
      >
        {/* Logo/Text Section */}
        <div
          style={{
            textAlign: 'center',
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <h1
            style={{
              fontFamily: "'Sofia', cursive",
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#666',
              margin: '0',
            }}
          >
            L&E
          </h1>
          <h2
            style={{
              fontFamily: "'Sofia', cursive",
              fontSize: '1.5rem',
              color: '#666',
              margin: '5px 0',
            }}
          >
            CulinarEAT
          </h2>
          <p
            style={{
              fontFamily: "'Sofia', cursive",
              fontSize: '0.9rem',
              color: '#666',
              margin: '5px 0',
            }}
          >
            BY LIA & EDEN
          </p>
        </div>

        {/* Links Section */}
        <div style={{ width: '200px', textAlign: 'left' }}>
          <h4
            style={{
              fontSize: '1.2rem',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ margin: '5px 0' }}>
              <Link to="/" style={{ color: '#333', textDecoration: 'none', transition: 'color 0.3s' }}>
                Home Page
              </Link>
            </li>
            <li style={{ margin: '5px 0' }}>
  <a
    href="mailto:culinareat@gmail.com?subject=Contact%20Us&body=Hi%20CulinarEAT%20Team%2C"
    style={{ color: '#333', textDecoration: 'none', transition: 'color 0.3s' }}
  >
    Contact Us
  </a>
</li>

            <li style={{ margin: '5px 0' }}>
              <Link to="/privacy" style={{ color: '#333', textDecoration: 'none', transition: 'color 0.3s' }}>
                Privacy Policy
              </Link>
            </li>
            <li style={{ margin: '5px 0' }}>
              <Link to="/terms" style={{ color: '#333', textDecoration: 'none', transition: 'color 0.3s' }}>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div style={{ width: '200px', textAlign: 'left' }}>
          <h4
            style={{
              fontSize: '1.2rem',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            Follow Us
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { name: 'Facebook', url: 'https://facebook.com' },
              { name: 'Twitter', url: 'https://twitter.com' },
              { name: 'Instagram', url: 'https://instagram.com' },
              { name: 'LinkedIn', url: 'https://linkedin.com' },
            ].map((social, index) => (
              <li key={index} style={{ margin: '5px 0' }}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#333',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseOver={(e) => (e.target.style.color = '#D4AF37')}
                  onMouseOut={(e) => (e.target.style.color = '#333')}
                >
                  <i className={`fab fa-${social.name.toLowerCase()}`} style={{ fontSize: '1.2rem' }}></i>
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div
        style={{
          fontSize: '0.9rem',
          color: '#666',
          textAlign: 'center',
          padding: '10px 0',
          margin: '0',
        }}
      >
        <p>&copy; {new Date().getFullYear()} CulinarEAT by Lia & Eden. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
