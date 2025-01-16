import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon
import { UserContext } from './UserContext'; // Adjust the path as necessary
import lunchImage from './images/lunch.png'; // Default image for recipes


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
  const [favorites, setFavorites] = useState([]); // Empty array as default
  const [hoveredRecipeId, setHoveredRecipeId] = useState(null); // Track hovered recipe
  const { user } = useContext(UserContext);

 // Fetch user's favorites from backend
useEffect(() => {
  const fetchFavorites = async () => {
      if (!user?.UserID) return; // Ensure UserID is available
      try {
        const response = await fetch(`http://localhost:5001/api/user-favorites/${user.UserID}`);
        if (response.ok) {
              const data = await response.json();
              console.log('Fetched favorites from backend:', data); // Debugging log

              // Map backend favorites to match frontend structure if necessary
              const formattedFavorites = data.map((favorite) => ({
                id: favorite.FavoriteID, // Use FavoriteID from backend
                title: favorite.RecipeTitle, // Use RecipeTitle from backend
                imageUrl: `/images/${favorite.ImageURL}`, // Construct ImageURL
              }));
              
            

              setFavorites(formattedFavorites);
          } else {
              console.error('Failed to fetch favorites:', await response.text());
          }
      } catch (error) {
          console.error('Error fetching favorites:', error);
      }
  };

  fetchFavorites();
}, [user?.UserID]);

  // Handle recipe removal from favorites
  const handleRemoveFavorite = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/favorites/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setFavorites(favorites.filter((recipe) => recipe.id !== id));
      } else {
        console.error('Failed to remove favorite:', await response.text());
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  // Navigate to the recipe's detail page
  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.headline}>Your Favorite Recipes</h1>
      <div style={styles.cardContainer}>
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
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
  src={recipe.ImageURL ? require(`./images/${recipe.ImageURL}.jpg`) : lunchImage}
  alt={recipe.title || 'Recipe Image'}
                style={styles.image}
                onError={(e) => (e.currentTarget.src = lunchImage)} // Fallback if image not found
                onClick={() => handleRecipeClick(recipe.id)}
              />
              <p style={styles.title}>{recipe.title}</p>
            </div>
          ))
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
