import React from 'react';
import breakfastImage from './images/breakfast.jpg'; // Breakfast
import lunchImage from './images/img1.png'; // Lunch
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
import chickenImage from './images/img1.png'; // Chicken
import beefImage from './images/img1.png'; // Beef


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
    fontSize: '3rem',
    textAlign: 'center',
    fontFamily: "'Dancing Script', cursive",
  },
  circlesSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '0.5cm',
  },
  circleItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  circleImage: {
    width: '75px',
    height: '75px',
    borderRadius: '50%',
    objectFit: 'cover',
    padding: '3px',
    background: 'linear-gradient(45deg, #8D6E63, #D4AF37, #d9b8a6)',
  },
  circleLabel: {
    marginTop: '8px',
    fontSize: '0.9rem',
    color: '#333',
    textAlign: 'center',
  },
  gridSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // Updated number of cols
    gap: '1.5cm', // Gap between cubes
    padding: '20px',
  },
  gridItem: {
    textAlign: 'center',
    width: '150px',
    height: '180px', // Keeps grid size consistent
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Aligns content to the top
  },
  gridImage: {
    width: '100%',
    height: '130px', // Adjusted height to leave room for the label
    borderRadius: '10px',
    objectFit: 'cover',
    marginBottom: '5px', // Adds consistent spacing between the image and label
  },
  gridLabel: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: '1.2', // Ensures proper spacing for multiline labels
  },
};

function HomePage() {
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
        {[].map((circle, index) => (
          <div style={styles.circleItem} key={index}>
            <img src={circle.img} alt={circle.label} style={styles.circleImage} />
            <span style={styles.circleLabel}>{circle.label}</span>
          </div>
        ))}
      </div>

      {/* Grid Section */}
      <div style={styles.gridSection}>
        {[
          { img: breakfastImage, label: 'Breakfast' },
          { img: lunchImage, label: 'Lunch' },
          { img: dinnerImage, label: 'Dinner' },
          { img: pastaImage, label: 'Pasta' },
          { img: seafoodImage, label: 'Fish & Sea Food' },
          { img: soupsImage, label: 'Soups' },
          { img: riceImage, label: 'Rice' },
          { img: dessertsImage, label: 'Desserts' },
          { img: vegetarianImage, label: 'Vegetarian' },
          { img: veganImage, label: 'Vegan' },
          { img: drinksImage, label: 'Drinks' },
          { img: quickMealsImage, label: 'Meals in 10 Minutes' },
          { img: chickenImage, label: 'Chicken' },
          { img: beefImage, label: 'Beef' },
          { img: asianImage, label: 'Asian' }, 
          { img: holidaysImage, label: 'Holidays' }, 
        ].map((grid, index) => (
          <div style={styles.gridItem} key={index}>
            <img src={grid.img} alt={grid.label} style={styles.gridImage} />
            <span style={styles.gridLabel}>{grid.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
