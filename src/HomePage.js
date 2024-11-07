import React from 'react';
import './css/HomePage.css';
import menuImage from './images/img1.png';  // Example image for Menu
import happyHourImage from './images/img2.png';  // Example image for Happy Hour
import locationImage from './images/img1.png';  // Example image for Location
import dessertImage from './images/img3.png';  // Example image for Desserts
import drinksImage from './images/img1.png';  // Example image for Drinks
import snacksImage from './images/img2.png';  // Example image for Snacks
import seafoodImage from './images/img1.png';  // Example image for Seafood
import bakeryImage from './images/img2.png';  // Example image for Bakery

function HomePage() {
  return (
    <div className="home-page">
      {/* Flexbox wrapper to control both sections */}
      <div className="page-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Culinareat</h1>
          </div>
        </div>

        {/* Circles Section */}
        <div className="circles-section">
          <div className="circle-item">
            <img src={menuImage} alt="About Us" />
            <span className="circle-label">About Us</span>
          </div>
          <div className="circle-item">
            <img src={happyHourImage} alt="Cooking Tips" />
            <span className="circle-label">Cooking Tips</span>
          </div>
          <div className="circle-item">
            <img src={locationImage} alt="Baking Tips" />
            <span className="circle-label">Baking Tips</span>
          </div>
          <div className="circle-item">
            <img src={dessertImage} alt="Conversions" />
            <span className="circle-label">Conversions</span>
          </div>
          <div className="circle-item">
            <img src={drinksImage} alt="" />
            <span className="circle-label"></span> {/* Empty label for future use */}
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid-section">
          <div className="grid-item">
            <img src={menuImage} alt="Menu" />
            <h2>Menu</h2>
          </div>
          <div className="grid-item">
            <img src={happyHourImage} alt="Happy Hour" />
            <h2>Happy Hour</h2>
          </div>
          <div className="grid-item">
            <img src={locationImage} alt="Location" />
            <h2>Location</h2>
          </div>
          <div className="grid-item">
            <img src={dessertImage} alt="Desserts" />
            <h2>Desserts</h2>
          </div>
          <div className="grid-item">
            <img src={drinksImage} alt="Drinks" />
            <h2>Drinks</h2>
          </div>
          <div className="grid-item">
            <img src={snacksImage} alt="Snacks" />
            <h2>Snacks</h2>
          </div>
          <div className="grid-item">
            <img src={seafoodImage} alt="Seafood" />
            <h2>Seafood</h2>
          </div>
          <div className="grid-item">
            <img src={bakeryImage} alt="Bakery" />
            <h2>Bakery</h2>
          </div>
          <div className="grid-item">
            <img src={menuImage} alt="Menu" />
            <h2>Menu</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
