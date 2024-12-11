import React, { useEffect, useState } from 'react';
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
    color: '#8B4513',
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
    border: '3px solid #D4AF37',
    backgroundColor: '#fff',
    objectFit: 'contain',
    padding: '5px',
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
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '35px',
    padding: '20px',
  },
  gridItem: {
    textAlign: 'center',
    width: '180px',
    height: '200px',
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
    backgroundColor: 'rgba(190, 196, 192, 0.1)',
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
  chatbotButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#D4AF37',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    zIndex: 1000,
  },
  chatbotIcon: {
    fontSize: '28px',
    color: '#fff',
  },
  chatbotOverlay: {
    position: 'fixed',
    bottom: '100px',
    right: '20px',
    width: '320px',
    height: '450px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  chatbotHeader: {
    backgroundColor: '#D4AF37',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  chatbotBody: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  chatbotFooter: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginRight: '10px',
    fontSize: '16px',
  },
  sendButton: {
    padding: '10px 15px',
    backgroundColor: '#D4AF37',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

function HomePage() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
    }
  };

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

      {/* Chatbot Overlay */}
      {showChatbot && (
        <div style={styles.chatbotOverlay}>
          <div style={styles.chatbotHeader}>Chat with CulinarEAT</div>
          <div style={styles.chatbotBody}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.user ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.user ? '#D4AF37' : '#f1f1f1',
                  color: msg.user ? '#fff' : '#333',
                  padding: '10px',
                  borderRadius: '5px',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div style={styles.chatbotFooter}>
            <input
              style={styles.input}
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button style={styles.sendButton} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Chatbot Button */}
      <div style={styles.chatbotButton} onClick={() => setShowChatbot(!showChatbot)}>
        <i className="fas fa-comment-dots" style={styles.chatbotIcon}></i>
      </div>
    </div>
  );
}

export default HomePage;
