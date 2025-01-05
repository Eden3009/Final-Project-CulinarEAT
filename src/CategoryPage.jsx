import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Font Awesome icon



const styles = {
  searchBarContainer: {
    position: "relative",
    width: "50%", // Adjusted width for uniformity
    margin: "20px auto",
    display: "flex",
    alignItems: "center",
    border: "2px solid #D4AF37",
    borderRadius: "30px",
    height: "42px",
    overflow: "hidden",
  },
  
  searchInput: {
    flex: 1,
    border: "none",
    padding: "10px 16px",
    outline: "none",
    fontSize: "14px",
    height: "100%",
  },
  searchButton: {
    backgroundColor: "#D4AF37",
    color: "#fff",
    border: "none",
    padding: "0 20px",
    fontSize: "16px",
    height: "100%",
    cursor: "pointer",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease", // Smooth hover effect
  },
  
  selectedIngredients: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  ingredientBadge: {
    padding: "8px 12px",
    backgroundColor: "#8B4513",
    color: "#fff",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  ingredientRemove: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  suggestionsDropdown: {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "0 0 10px 10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    listStyleType: "none",
    padding: "10px 0",
    margin: "0",
  },
  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
  
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
      position: 'relative',  // Center within the hero section instead of absolute positioning
      fontSize: '120px', // Keep the new font size if preferred
      fontWeight: 'bold',
      color: '#fff',
      textShadow: `
        3px 3px 0 #d77a65,
        6px 6px 0 rgba(0, 0, 0, 0.2)
      `,
      padding: '20px',
      fontFamily: "'Merienda', cursive", // Consistent with the back button font
      textAlign: 'center',  // Center the text
      margin: '0 auto',  // Ensure the hero text is horizontally centered
      backgroundColor: 'transparent', // No background
      border: 'none',
  },
    
  contentSection: {
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Georgia, serif',
      color: '#333',
      width: '90%', // Adjust width to reduce dead space
      maxWidth: '1200px', // Add a max width for large screens
  },

  headline: {
      fontSize: '32px',
      fontWeight: 'bold',
      margin: '20px 0',
      color: '#d77a65',
      fontFamily: "'Merienda', cursive", // Set font to Merienda
  },

  description: {
      fontSize: '20px',
      lineHeight: '1.8',
  },
    
  recipeList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
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
      cursor: 'pointer', // Indicate clickability
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },

  recipeCardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
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
      left: '10px', 
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      fontSize: '28px', 
      fontWeight: 'bold',
      color: '#fff',
      textShadow: `
        3px 3px 0 #d77a65,
        6px 6px 0 rgba(0, 0, 0, 0.2)
      `,
      fontFamily: 'Oregano, serif',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
    
  backButtonHover: {
      transform: 'scale(1.1)',
  },
  paginationButton: {
    width: '100px', // Fixed width for consistent size
    padding: '12px',
    backgroundColor: '#d77a65', // Default background color
    color: '#fff',
    border: 'none',
    borderRadius: '8px', // Rounded corners
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: "'Merienda', cursive", // Font style
    margin: '0 5px', // Add spacing between buttons
    transition: 'background-color 0.3s ease, transform 0.2s', // Smooth transition for hover
  },
  
  paginationButtonHover: {
    backgroundColor: '#b35c4e', // Darker hover color
    transform: 'scale(1.05)', // Slight enlargement on hover
  },
    
  };

function CategoryPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const recipesPerPage = 21; // Recipes per page
    const [searchTerm, setSearchTerm] = useState(""); // For dynamic search by name
const [selectedIngredients, setSelectedIngredients] = useState([]); // For selected ingredients
const [suggestedIngredients, setSuggestedIngredients] = useState([]); // For ingredient suggestions
const [searchType, setSearchType] = useState("recipe"); // Default to "recipe" search type
const [originalRecipes, setOriginalRecipes] = useState([]); // Add this new state
const [suggestions, setSuggestions] = useState([]);

const filterByRecipeName = (searchTerm) => {
  if (!searchTerm.trim()) {
    setRecipes([...originalRecipes]); // Reset recipes if search term is empty
    return;
  }

  const filteredRecipes = originalRecipes.filter((recipe) =>
    recipe.RecipeTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setRecipes(filteredRecipes);
};


  
    // Destructure data from `state` passed by `HomePage`
    const { img, label, apiPath } = location.state || {};
  
    useEffect(() => {
      const fetchRecipes = async () => {
          // Check whether we are using a label or apiPath for fetching recipes
          if (!label && !apiPath) {
              console.error('No label or API path provided.');
              setLoading(false);
              return;
          }
  
          try {
              let response;
  
              if (apiPath) {
                  // Fetch based on the dynamic API path (e.g., search results)
                  response = await fetch(`http://localhost:5001${apiPath}`);
              } else if (label) {
                  // Fetch recipes based on the category label
                  response = await fetch(`http://localhost:5001/api/recipes?themeName=${label}`);
              }
  
              // Check if the response is not OK
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
  
              // Validate if the response is JSON
              const contentType = response.headers.get('Content-Type');
              if (!contentType || !contentType.includes('application/json')) {
                  throw new Error('Invalid response format. Expected JSON.');
              }
  
              // Parse the response and update recipes
              const data = await response.json();
              if (data && Array.isArray(data.recipes)) {
                setRecipes(data.recipes || []); // Update recipes state
                setOriginalRecipes(data.recipes || []); // Save the full list for resetting
              } else {
                  console.warn('No recipes found or invalid data format.');
                  setRecipes([]);
              }
          } catch (error) {
              console.error('Error fetching recipes:', error);
          } finally {
              setLoading(false); // Ensure loading is stopped
          }
      };
  
      fetchRecipes();
  }, [label, apiPath]); // Add `apiPath` as a dependency
  
    
    
    
  
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
    const handleIngredientSearch = () => {
      if (selectedIngredients.length === 0) return;
    
      const query = selectedIngredients.join(",");
      fetch(`http://localhost:5001/api/search?query=${query}&type=ingredient`)
        .then((res) => res.json())
        .then((data) => setRecipes(data.recipes || []))
        .catch((error) => console.error("Error fetching recipes by ingredients:", error));
    };
    

    const resetSearch = () => {
      setRecipes([...originalRecipes]); // Reset recipes to the original list
      setSearchTerm("");
      setSelectedIngredients([]);
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
            backgroundImage: `url(${img})`, // Dynamic background image
          }}
        >
          <h1 style={styles.heroText}>{label}</h1> {/* Dynamic title */}
        </div>
    
        {/* Content Section */}
        <div style={styles.contentSection}>
          <h2 style={styles.headline}>{`Discover the best ${label} recipes!`}</h2>
          <p style={styles.description}>
            Explore our curated selection of recipes, crafted to delight your taste buds!
          </p>
    
          {/* Search Bar */}
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <div style={styles.searchBarContainer}>
              <input
                type="text"
                placeholder={`Search ${label.toLowerCase()} recipes or ingredients...`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (searchType === "recipe") {
                    filterByRecipeName(e.target.value);
                  } else if (searchType === "ingredient" && e.target.value.trim()) {
                    fetch(`http://localhost:5001/api/search?query=${e.target.value}&type=ingredient&action=autocomplete`)
                      .then((res) => res.json())
                      .then((data) => setSuggestedIngredients(data.ingredients || []))
                      .catch((error) => console.error("Error fetching ingredient suggestions:", error));
                  } else {
                    setSuggestedIngredients([]);
                  }
                }}
                style={styles.searchInput}
              />
              <button
                style={styles.searchButton}
                onClick={() => {
                  if (searchType === "ingredient" && selectedIngredients.length > 0) {
                    handleIngredientSearch();
                  } else if (searchType === "recipe") {
                    filterByRecipeName(searchTerm);
                  }
                }}
              >
                Search
              </button>
            </div>
    
            {/* Suggestions Dropdown */}
            {suggestedIngredients.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%", // Positioned directly below the search bar
                  left: "0",
                  width: "100%",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "0 0 10px 10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000, // Ensure it appears above other elements
                  listStyleType: "none",
                  padding: "10px 0",
                  margin: "0",
                }}
              >
                {suggestedIngredients.map((ingredient, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedIngredients((prev) => [...prev, ingredient.IngredientName]);
                      setSearchTerm("");
                      setSuggestedIngredients([]);
                    }}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {ingredient.IngredientName}
                  </li>
                ))}
              </ul>
            )}
          </div>
    
          {/* Search Tabs */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            {["recipe", "ingredient"].map((type) => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                style={{
                  padding: "10px 20px",
                  margin: "0 5px",
                  borderRadius: "20px",
                  border: searchType === type ? "2px solid #D4AF37" : "1px solid #D4AF37",
                  backgroundColor: searchType === type ? "#D4AF37" : "#fff",
                  color: searchType === type ? "#fff" : "#D4AF37",
                  cursor: "pointer",
                }}
              >
                {type === "recipe" ? "By Recipe Name" : "By Ingredient"}
              </button>
            ))}
          </div>
    
          {/* Selected Ingredients */}
          <div style={styles.selectedIngredients}>
            {selectedIngredients.map((ingredient, index) => (
              <div key={index} style={styles.ingredientBadge}>
                {ingredient}
                <button
                  onClick={() =>
                    setSelectedIngredients((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  style={styles.ingredientRemove}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
    
          {/* Recipe List */}
          {loading ? (
            <p>Loading recipes...</p>
          ) : (
            <>
              <div style={styles.recipeList}>
                {currentRecipes.map((recipe) => (
                  <div
                    key={recipe.RecipeID}
                    style={styles.recipeCard}
                    onClick={() => {
                      const recipeIdString = String(recipe.RecipeID); // Ensure RecipeID is a string
                      navigate(`/recipe-view/${recipeIdString}`);
                    }}
                  >
                    <img
                      src={(function getImage() {
                        try {
                          return require(`./images/${recipe.ImageURL}.jpg`);
                        } catch {
                          return require("./images/default-image.jpg"); // Fallback if the image is missing
                        }
                      })()}
                      alt={recipe.RecipeTitle || "Recipe Image"}
                      style={styles.recipeImage}
                    />
                    <h3 style={styles.recipeName}>{recipe.RecipeTitle}</h3>
                  </div>
                ))}
              </div>
    
              {/* Pagination */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  <button
    disabled={currentPage === 1}
    onClick={() => paginate(currentPage - 1)}
    style={{
      ...styles.paginationButton,
      backgroundColor: currentPage === 1 ? '#f0f0f0' : '#d77a65',
      color: currentPage === 1 ? '#ccc' : '#fff',
      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b35c4e')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d77a65')}
  >
    Previous
  </button>
  <button
    disabled={currentPage === totalPages}
    onClick={() => paginate(currentPage + 1)}
    style={{
      ...styles.paginationButton,
      backgroundColor: currentPage === totalPages ? '#f0f0f0' : '#d77a65',
      color: currentPage === totalPages ? '#ccc' : '#fff',
      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b35c4e')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d77a65')}
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
  