import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import breakfastImage from './images/breakfast.jpg'; // Breakfast
import lunchImage from './images/lunch.png'; // Lunch
import dinnerImage from './images/dinner.jpg'; // Dinner
import pastaImage from './images/pastapic.jpg'; // Pasta
import riceImage from './images/rice.jpg'; // Rice
import seafoodImage from './images/seafood.jpg'; // Fish & Sea Food
import soupsImage from './images/soups.jpg'; // Soups
import asianImage from './images/asian.jpg'; // Asian
import vegetarianImage from './images/vegetarian.jpg'; // Vegetarian
import veganImage from './images/vegtable.jpg'; // Vegan
import holidaysImage from './images/holidays.jpg'; // Holidays
import quickMealsImage from './images/10min.jpg'; // Meals in 10 Minutes
import dessertsImage from './images/chocolatecubes.jpg'; // Desserts
import drinksImage from './images/beverage.jpg'; // Drinks
import chickenImage from './images/chicken.jpg'; // Chicken
import beefImage from './images/beef.jpg'; // Beef
import aboutUsImage from './images/logo1.jpeg'; // About Us
import cookingTipsImage from './images/cooking.png'; // Cooking Tips
import bakingTipsImage from './images/baking4.png'; // Baking Tips
import conversionsImage from './images/conversions4.png'; // Conversions
import specialOffersImage from './images/new2.jpeg'; // New this week

const styles = {
  homePage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f7f4',
    width: '100%',
  },
  heroSection: {
    height: '30vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  heroOverlay: {
    color: '#8B4513', // Deep brown
    fontSize: '35px',
    textAlign: 'center',
    fontFamily: 'Georgia',
  },
  circlesSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
    marginBottom: '40px',
  },
  circleItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  circleImage: {
    width: '75px',
    height: '75px',
    borderRadius: '50%',
    border: '3px solid #D4AF37', // Golden frame
    backgroundColor: '#fff',
    objectFit: 'contain', // Ensure the entire image fits inside
    padding: '5px', // Add padding to avoid cropped images
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  circleLabel: {
    marginTop: '10px',
    fontSize: '0.9rem',
    color: '#333',
    textAlign: 'center',
  },
  gridSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 items per row
    gap: '35px', // Increase the gap between items
    padding: '20px',
  },
  gridItem: {
    textAlign: 'center',
    width: '180px', // Increase width
    height: '200px', // Increase height
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    cursor: 'pointer',
  },
  gridItemHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(190, 196, 192, 0.1)', // Light orange tint
    transition: 'opacity 0.4s ease',
    opacity: 0,
  },
  overlayVisible: {
    opacity: 1,
  },
  gridImage: {
    width: '100%',
    height: '130px',
    objectFit: 'cover',
    borderRadius: '10px',
    transition: 'transform 0.4s ease',
  },
  gridLabel: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '10px',
  },
};

function HomePage() {
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  const categories = [
    { img: breakfastImage, label: 'Breakfast', path: '/breakfast' },
    { img: lunchImage, label: 'Lunch', path: '/lunch' },
    { img: dinnerImage, label: 'Dinner', path: '/dinner' },
    { img: pastaImage, label: 'Pasta', path: '/pasta' },
    { img: seafoodImage, label: 'Fish & Sea Food', path: '/seafood' },
    { img: soupsImage, label: 'Soups', path: '/soups' },
    { img: riceImage, label: 'Rice', path: '/rice' },
    { img: dessertsImage, label: 'Desserts', path: '/desserts' },
    { img: vegetarianImage, label: 'Vegetarian', path: '/vegetarian' },
    { img: veganImage, label: 'Vegan', path: '/vegan' },
    { img: drinksImage, label: 'Drinks', path: '/drinks' },
    { img: quickMealsImage, label: 'Meals in 10 Minutes', path: '/quick-meals' },
    { img: chickenImage, label: 'Chicken', path: '/chicken' },
    { img: beefImage, label: 'Beef', path: '/beef' },
    { img: asianImage, label: 'Asian', path: '/asian' },
    { img: holidaysImage, label: 'Holidays', path: '/holidays' },
  ];

  const tips = [
    { img: aboutUsImage, label: 'About Us' },
    { img: cookingTipsImage, label: 'Cooking Tips' },
    { img: bakingTipsImage, label: 'Baking Tips' },
    { img: conversionsImage, label: 'Conversions' },
    { img: specialOffersImage, label: 'New This Week' },
  ];

  return (
    <div style={styles.homePage}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1>CulinarEAT</h1>
        </div>
      </div>

      {/* Circles Section */}
      <div style={styles.circlesSection}>
        {tips.map((tip, index) => (
          <div
            style={{
              ...styles.circleItem,
              ...(hoverIndex === `circle-${index}` ? { transform: 'scale(1.1)' } : {}),
            }}
            key={`circle-${index}`}
            onMouseEnter={() => setHoverIndex(`circle-${index}`)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <img src={tip.img} alt={tip.label} style={styles.circleImage} />
            <span style={styles.circleLabel}>{tip.label}</span>
          </div>
        ))}
      </div>

      {/* Grid Section */}
      <div style={styles.gridSection}>
        {categories.map((grid, index) => (
          <Link to={grid.path} key={index} style={{ textDecoration: 'none' }}>
            <div
              style={{
                ...styles.gridItem,
                ...(hoverIndex === index ? styles.gridItemHover : {}),
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div
                style={{
                  ...styles.overlay,
                  ...(hoverIndex === index ? styles.overlayVisible : {}),
                }}
              ></div>
              <img src={grid.img} alt={grid.label} style={styles.gridImage} />
              <span style={styles.gridLabel}>{grid.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
