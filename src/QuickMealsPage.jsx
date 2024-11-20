import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quickMealsImage from './images/10min.jpg'; // Quick Meals Image
import { FaArrowLeft } from 'react-icons/fa'; // Font Awesome icon

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f7f4',
    width: '100%',
    minHeight: '100vh',
    position: 'relative', // For positioning the back button
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30vh',
    width: '100%',
    backgroundImage: `url(${quickMealsImage})`, // Use quick meals image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#8B4513', 
    textAlign: 'center',
    position: 'relative',
  },
  heroText: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: '#fff', // White text color
    textShadow: '2px 2px 0 #8B4513, -2px -2px 0 #8B4513, 2px -2px 0 #8B4513, -2px 2px 0 #8B4513', // Brown frame
    padding: '10px',
  },
  contentSection: {
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Georgia, serif',
    color: '#333',
  },
  headline: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '20px 0',
    color: '#8B4513',
  },
  description: {
    fontSize: '20px',
    lineHeight: '1.8',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 10, 
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px', 
    fontSize: '14px', 
    fontWeight: 'bold',
    color: '#8B4513',
    backgroundColor: '#fff',
    border: '1.5px solid #8B4513', 
    borderRadius: '6px', 
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)', 
  },
  backButtonHover: {
    backgroundColor: '#8B4513',
    color: '#fff',
    transform: 'scale(1.05)',
    boxShadow: '0 5px 8px rgba(0, 0, 0, 0.2)',
  },
  backIcon: {
    marginRight: '6px', 
  },
};

function QuickMealsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div style={styles.page}>
      {/* Back Button */}
      <button
        style={styles.backButton}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = styles.backButtonHover.backgroundColor;
          e.target.style.color = styles.backButtonHover.color;
          e.target.style.transform = styles.backButtonHover.transform;
          e.target.style.boxShadow = styles.backButtonHover.boxShadow;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = styles.backButton.backgroundColor;
          e.target.style.color = styles.backButton.color;
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = styles.backButton.boxShadow;
        }}
        onClick={handleBackButtonClick}
      >
        <FaArrowLeft style={styles.backIcon} /> Back
      </button>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroText}>Quick Meals Recipes</h1>
      </div>

      {/* Content Section */}
      <div style={styles.contentSection}>
        <h2 style={styles.headline}>Delicious in No Time!</h2>
        <p style={styles.description}>
          <span style={{ display: 'block' }}>
            Whip up quick and easy meals perfect for busy days and tight schedules.
          </span>
          <span style={{ display: 'block' }}>
            From simple snacks to hearty dinners, enjoy flavorful dishes in minutes!
          </span>
        </p>
      </div>
    </div>
  );
}

export default QuickMealsPage;
