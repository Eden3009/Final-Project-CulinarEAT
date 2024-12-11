import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import drinksImage from './images/beverage.jpg'; // Drinks Image
import { FaArrowLeft } from 'react-icons/fa'; // Font Awesome icon

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f7f4',
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30vh',
    width: '100%',
    backgroundImage: `url(${drinksImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#8B4513',
    textAlign: 'center',
    position: 'relative',
  },
  heroText: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '2px 2px 0 #8B4513, -2px -2px 0 #8B4513, 2px -2px 0 #8B4513, -2px 2px 0 #8B4513',
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
  recipeList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
    width: '100%',
    padding: '10px',
  },
  recipeCard: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  recipeImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  recipeName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#8B4513',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    listStyleType: 'none',
    padding: 0,
  },
  pageButton: {
    margin: '0 5px',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#8B4513',
    textDecoration: 'none',
    outline: 'none',
  },
  pageButtonActive: {
    color: 'blue',
    textDecoration: 'underline',
  },
  arrowButton: {
    margin: '0 5px',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#8B4513',
    border: 'none',
    backgroundColor: 'transparent',
  },
  arrowDisabled: {
    color: '#ccc',
    cursor: 'not-allowed',
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
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
  },
};

function DrinksPage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 15;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch recipes from the API
    fetch('/api/recipes?category=drinks') // Adjust the endpoint as needed
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, []);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.page}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={handleBackButtonClick}>
        <FaArrowLeft /> Back
      </button>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroText}>Drinks Recipes</h1>
      </div>

      {/* Content Section */}
      <div style={styles.contentSection}>
        <h2 style={styles.headline}>Cheers to Creativity!</h2>
        <p style={styles.description}>
          Discover refreshing beverages and warm drinks for every occasion.
          From smoothies to cocktails, find the perfect recipe to sip and savor!
        </p>

        {/* Recipe List */}
        {loading ? (
          <p>Loading recipes...</p>
        ) : (
          <>
            <div style={styles.recipeList}>
              {currentRecipes.map((recipe) => (
                <div key={recipe.id} style={styles.recipeCard}>
                  <img src={recipe.image} alt={recipe.name} style={styles.recipeImage} />
                  <h3 style={styles.recipeName}>{recipe.name}</h3>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div style={styles.pagination}>
              <button
                style={
                  currentPage === 1
                    ? { ...styles.arrowButton, ...styles.arrowDisabled }
                    : styles.arrowButton
                }
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &#8249; {/* Left arrow */}
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  style={
                    currentPage === index + 1
                      ? { ...styles.pageButton, ...styles.pageButtonActive }
                      : styles.pageButton
                  }
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                style={
                  currentPage === totalPages
                    ? { ...styles.arrowButton, ...styles.arrowDisabled }
                    : styles.arrowButton
                }
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &#8250; {/* Right arrow */}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DrinksPage;
