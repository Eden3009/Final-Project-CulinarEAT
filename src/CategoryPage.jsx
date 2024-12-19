import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

function CategoryPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const recipesPerPage = 20; // Recipes per page
  
    // Destructure data from `state` passed by `HomePage`
    const { img, label, apiPath } = location.state || {};
  
    useEffect(() => {
        window.scrollTo(0, 0);
    
        if (label) {
            fetch(`/api/recipes?themeName=${encodeURIComponent(label)}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setRecipes(data.recipes || []); // Update recipes state
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching recipes:', error);
                    setLoading(false);
                });
        }
    }, [label]);
    
    
  
    const handleBackButtonClick = () => {
      navigate(-1);
    };
  
    // Pagination logic
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe); // Get recipes for the current page
    const totalPages = Math.ceil(recipes.length / recipesPerPage); // Calculate total pages
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); // Scroll to top on page change
    };
  
    return (
      <div style={styles.page}>
        {/* Back Button */}
        <button style={styles.backButton} onClick={handleBackButtonClick}>
          <FaArrowLeft /> Back
        </button>
  
        {/* Hero Section */}
        <div
          style={{
            ...styles.heroSection,
            backgroundImage: `url(${img})`, // Set background image dynamically
          }}
        >
          <h1 style={styles.heroText}>{label}</h1> {/* Dynamic title */}
        </div>
  
        {/* Content Section */}
        <div style={styles.contentSection}>
          <h2 style={styles.headline}>{`Discover the best ${label} recipes!`}</h2>
          <p style={styles.description}>
            Explore our curated selection of recipes, crafted to delight your taste buds.
          </p>
  
          {/* Recipe List */}
          {loading ? (
            <p>Loading recipes...</p>
          ) : (
            <>
              <div style={styles.recipeList}>
                {currentRecipes.map((recipe) => (
                  <div key={recipe.RecipeID} style={styles.recipeCard}>
                    <img
                      src={recipe.ImageURL || 'default-image.jpg'}
                      alt={recipe.RecipeTitle}
                      style={styles.recipeImage}
                    />
                    <h3 style={styles.recipeName}>{recipe.RecipeTitle}</h3>
                  </div>
                ))}
              </div>
  
              {/* Pagination */}
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  style={{
                    padding: '8px 12px',
                    margin: '0 5px',
                    border: '1px solid #ddd',
                    backgroundColor: currentPage === 1 ? '#f0f0f0' : '#fff',
                    color: currentPage === 1 ? '#ccc' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    borderRadius: '4px',
                  }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    style={{
                      padding: '8px 12px',
                      margin: '0 5px',
                      border: '1px solid #ddd',
                      backgroundColor: currentPage === index + 1 ? '#8B4513' : '#fff',
                      color: currentPage === index + 1 ? '#fff' : '#333',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                  style={{
                    padding: '8px 12px',
                    margin: '0 5px',
                    border: '1px solid #ddd',
                    backgroundColor: currentPage === totalPages ? '#f0f0f0' : '#fff',
                    color: currentPage === totalPages ? '#ccc' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    borderRadius: '4px',
                  }}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  
  export default CategoryPage;
  