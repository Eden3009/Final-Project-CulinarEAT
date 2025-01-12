import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon

// Import images explicitly
import asianImage from './images/asian.jpg';
import cookiesImage from './images/ancho-mole-cookies.jpg';
import stewImage from './images/apple-and-kohlrabi-coleslaw-vegetable-kingdom.jpg';

const initialFavorites = [
  {
    id: 1,
    title: 'Asian Sushi',
    imageUrl: asianImage,
  },
  {
    id: 2,
    title: 'Classic Chocolate Chip Cookies',
    imageUrl: cookiesImage,
  },
  {
    id: 3,
    title: 'Hearty Vegetable Stew',
    imageUrl: stewImage,
  },
  {
    id: 4,
    title: 'Delicious Pasta',
    imageUrl: asianImage,
  },
  {
    id: 5,
    title: 'Summer Salad',
    imageUrl: stewImage,
  },
];

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f7f4',
    padding: '20px',
    minHeight: '100vh',
  },
  headline: {
    fontSize: '40px',
    fontFamily: "'Merienda', cursive",
    fontWeight: 'bold',
    color: '#B55335',
    marginBottom: '20px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    maxWidth: '1000px',
    gap: '20px',
  },
  card: {
    width: '200px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    textAlign: 'center',
    position: 'relative',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '18px',
    fontFamily: "'Georgia', serif",
    color: '#8B4513',
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    fontSize: '20px',
    color: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#333',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontFamily: "'Arial', sans-serif",
    top: '-30px', // Position the tooltip above the heart icon
    left: '0px',
    whiteSpace: 'nowrap',
    zIndex: '10',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
  },
  tooltipVisible: {
    opacity: '1',
    visibility: 'visible',
  },
};

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(initialFavorites);
  const [hoveredRecipeId, setHoveredRecipeId] = useState(null); // Track which recipe is hovered

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.headline}>Your Favorite Recipes</h1>
      <div style={styles.cardContainer}>
        {favorites.map((recipe) => (
          <div key={recipe.id} style={styles.card}>
            {/* Tooltip */}
            <span
              style={{
                ...styles.tooltip,
                ...(hoveredRecipeId === recipe.id ? styles.tooltipVisible : {}),
              }}
            >
              Remove from Favorites
            </span>

            {/* Heart Icon */}
            <FaHeart
              style={styles.heartIcon}
              onMouseEnter={() => setHoveredRecipeId(recipe.id)}
              onMouseLeave={() => setHoveredRecipeId(null)}
              onClick={() => handleRemoveFavorite(recipe.id)}
            />
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              style={styles.image}
              onClick={() => handleRecipeClick(recipe.id)}
            />
            <p style={styles.title}>{recipe.title}</p>
          </div>
        ))}
        {favorites.length === 0 && <p>No favorites added yet.</p>}
      </div>
    </div>
  );
};

export default FavoritesPage;
