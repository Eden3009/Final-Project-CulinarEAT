import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // MUI Search Icon
import breakfastImage from './images/breakfast.jpg'; // Breakfast
import lunchImage from './images/lunch.png'; // Lunch
import dinnerImage from './images/dinner.jpg'; // Dinner
import pastaImage from './images/pastapic.jpg'; // Pasta
import seafoodImage from './images/seafood.jpg'; // Fish & Sea Food
import chickenImage from './images/chicken.jpg'; // Chicken
import beefImage from './images/beef.jpg'; // Beef
import soupsImage from './images/soups.jpg'; // Soups
import riceImage from './images/rice.jpg'; // Rice
import dessertsImage from './images/chocolatecubes.jpg'; // Desserts
import quickMealsImage from './images/10min.jpg'; // Meals in 10 Minutes
import vegetarianImage from './images/vegetarian.jpg'; // Vegetarian
import veganImage from './images/vegtable.jpg'; // Vegan
import glutenFreeImage from './images/glutenfree.jpeg'; // Gluten Free
import kidsMealImage from './images/kidsfood.jpg'; // Kids Meal
import mealPrepImage from './images/mealprep.jpeg'; // Meal Prep
import holidaysImage from './images/holidays.jpg'; // Holidays
import budgetFriendlyImage from './images/budgetfriendly.jpeg'; // Budget Friendly
import healthyEatingImage from './images/healthyfood.jpeg'; // Healthy Eating
import snacksImage from './images/snacks.jpeg'; // Snacks
import picnicAndBBQImage from './images/picnicfood.jpeg'; // Picnic & BBQ
import asianImage from './images/asian.jpg'; // Asian
import ethnicCuisineImage from './images/ethnicfood.jpeg'; // Ethnic Cuisine
import dateMealsImage from './images/datemeal.jpg'; // Date Meal
import weeknightDinnerImage from './images/weekendmeal.jpg'; // Weekend Meal
import seasonalFoodImage from './images/seasonalfood.jpeg'; // Seasonal Food
import comfortFoodImage from './images/comfortfood.jpeg'; // Comfort Food
import partyFoodImage from './images/partyfood.jpeg'; // Party Food
import drinksImage from './images/beverage.jpg'; // Drinks

// Circles
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
    marginBottom: '1px', // Decrease space below the headline
  },
  
  heroOverlay: {
    color: '#B55335', //#ce6140
    fontSize: '48px',
    textAlign: 'center',
    fontFamily: 'Oregano, serif', // Headline Font
  },
  

  circlesSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '-40px',
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
    background: 'white', // Keep background of the image white or transparent
    objectFit: 'contain',
    padding: '5px',
    position: 'relative',
  },
  
  // Create a container for the gradient border
  circleGradient: {
    width: '85px',
    height: '85px',
    borderRadius: '50%',
    background: 'conic-gradient(from 0deg,#ce6140,rgba(215, 122, 101, 0.77), #d77a65, #B55335)', // Earthy pink-brown tones
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px',
  },
  
  
  circleLabel: {
    marginTop: '10px',
    fontSize: '0.9rem',
    color: '#333',
    textAlign: 'center',
  },
  gridSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
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
  searchBarContainer: {
    margin: '20px 0',
    textAlign: 'center',
  },
  
  searchTabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  
  searchInput: {
    width: '80%',
    padding: '15px',
    borderRadius: '30px',
    border: '1px solid #8B4513',
    outline: 'none',
    fontSize: '16px',
  },
  
  searchButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#B55335',
    color: '#fff',
    border: 'none',
    padding: '0 20px',
    fontSize: '14px',
    height: '100%',
    cursor: 'pointer',
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
    transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
  },
  searchButtonHover: {
    backgroundColor: '#B8860B', // Change to a slightly darker shade on hover
  },
  
  
  suggestionsDropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '0 0 10px 10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    listStyleType: 'none',
    padding: '10px 0',
    margin: '0',
  },
  
  suggestionItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
  },
  
};

function HomePage() {
  const navigate = useNavigate(); // Initialize `navigate`
  const [hoverIndex, setHoverIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all'); // Options: 'all', 'recipe', 'ingredient'
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);


  
  // Fetch suggestions dynamically
  useEffect(() => {
    if (searchType === 'ingredient' && searchTerm.length > 0) {
        // Fetch suggestions for autocomplete
        fetch(`http://localhost:5001/api/search?query=${searchTerm}&type=ingredient&action=autocomplete`)
            .then((res) => res.json())
            .then((data) => setSuggestedIngredients(data.ingredients || []))
            .catch((error) => console.error('Error fetching ingredient suggestions:', error));
    } else if (searchTerm.length > 0) {
        // Fetch recipe suggestions
        fetch(`http://localhost:5001/api/search?query=${searchTerm}&type=${searchType}`)
            .then((res) => res.json())
            .then((data) => setSuggestions(data.recipes || []))
            .catch((error) => console.error('Error fetching suggestions:', error));
    } else {
        setSuggestedIngredients([]);
        setSuggestions([]);
    }
}, [searchTerm, searchType]);


  
const handleSearch = () => {
  if (searchType === 'ingredient' && selectedIngredients.length > 0) {
      // Multi-ingredient search
      const query = selectedIngredients.join(',');
      navigate('/category', {
          state: {
              label: `Recipes with Ingredients`,
              apiPath: `/api/search?query=${query}&type=ingredient`,
          },
      });
  } else if (searchType === 'ingredient' && searchTerm.trim()) {
      // Single ingredient search
      navigate('/category', {
          state: {
              label: `Recipes with '${searchTerm}'`,
              apiPath: `/api/search?query=${searchTerm}&type=ingredient`,
          },
      });
  } else if (searchTerm.trim()) {
      // Recipe name search
      navigate('/category', {
          state: {
              label: `Search Results for '${searchTerm}'`,
              apiPath: `/api/search?query=${searchTerm}&type=${searchType}`,
          },
      });
  }
};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { img: breakfastImage, label: 'Breakfast', apiPath: '/api/recipes?category=breakfast' },
    { img: lunchImage, label: 'Lunch', apiPath: '/api/recipes?category=lunch' },
    { img: dinnerImage, label: 'Dinner', apiPath: '/api/recipes?category=dinner' },
    { img: pastaImage, label: 'Pasta', apiPath: '/api/recipes?category=pasta' },
    { img: seafoodImage, label: 'Fish & Sea Food', apiPath: '/api/recipes?category=seafood' },
    { img: soupsImage, label: 'Soups', apiPath: '/api/recipes?category=soups' },
    { img: riceImage, label: 'Rice', apiPath: '/api/recipes?category=rice' },
    { img: dessertsImage, label: 'Desserts', apiPath: '/api/recipes?category=desserts' },
    { img: vegetarianImage, label: 'Vegetarian', apiPath: '/api/recipes?category=vegetarian' },
    { img: veganImage, label: 'Vegan', apiPath: '/api/recipes?category=vegan' },
    { img: drinksImage, label: 'Drinks', apiPath: '/api/recipes?category=drinks' },
    { img: quickMealsImage, label: 'Quick Meals', apiPath: '/api/recipes?category=quick-meals' },
    { img: chickenImage, label: 'Chicken', apiPath: '/api/recipes?category=chicken' },
    { img: beefImage, label: 'Beef', apiPath: '/api/recipes?category=beef' },
    { img: asianImage, label: 'Asian', apiPath: '/api/recipes?category=asian' },
    { img: holidaysImage, label: 'Holidays', apiPath: '/api/recipes?category=holidays' },
    { img: kidsMealImage, label: "Kids' Meals", apiPath: '/api/recipes?category=kids-meals' },
    { img: dateMealsImage, label: 'Meals for Date', apiPath: '/api/recipes?category=meals-for-date' },
    { img: budgetFriendlyImage, label: 'Budget-Friendly', apiPath: '/api/recipes?category=budget-friendly' },
    { img: weeknightDinnerImage, label: 'Weeknight Dinners', apiPath: '/api/recipes?category=weeknight-dinners' },
    { img: ethnicCuisineImage, label: 'Ethnic Cuisine', apiPath: '/api/recipes?category=ethnic-cuisine' },
    { img: comfortFoodImage, label: 'Comfort Food', apiPath: '/api/recipes?category=comfort-food' },
    { img: snacksImage, label: 'Snacks', apiPath: '/api/recipes?category=snacks' },
    { img: mealPrepImage, label: 'Meal Prep', apiPath: '/api/recipes?category=meal-prep' },
    { img: healthyEatingImage, label: 'Healthy Eating', apiPath: '/api/recipes?category=healthy-eating' },
    { img: seasonalFoodImage, label: 'Seasonal (e.g., Fall)', apiPath: '/api/recipes?category=seasonal' },
    { img: partyFoodImage, label: 'Party Foods', apiPath: '/api/recipes?category=party-foods' },
    { img: picnicAndBBQImage, label: 'Picnic & BBQ', apiPath: '/api/recipes?category=picnic-bbq' },
    { img: glutenFreeImage, label: 'Gluten-Free', apiPath: '/api/recipes?category=gluten-free' },
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
      {/* Gradient border container */}
      <div style={styles.circleGradient}>
        <img src={tip.img} alt={tip.label} style={styles.circleImage} />
      </div>
      <span style={styles.circleLabel}>{tip.label}</span>
    </div>
  ))}
</div>


{/* Search Bar */}  
<div style={{ width: '100%', margin: '30px auto', maxWidth: '600px', position: 'relative' }}>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: '50px',
      padding: '8px 16px',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <input
      type="text"
      placeholder="Search recipes or ingredients..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        flex: 1,
        border: 'none',
        fontSize: '16px',
        borderRadius: '50px',
        padding: '12px 16px',
        outline: 'none', // Removes the outline
      }}
    />
    <button
      onClick={handleSearch}
      style={{
        backgroundColor: 'transparent', // No background
        border: 'none',
        padding: '10px 12px',
        borderRadius: '50px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SearchIcon
        sx={{
          color: '#D77A65', // Pink color for the magnifying glass
          fontSize: '28px', // Adjust the size if needed
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#ce6140')} // Darker pink on hover
        onMouseLeave={(e) => (e.currentTarget.style.color = '#ce6140')}
      />
    </button>
  </div>


    {/* Search Tabs */}
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
  {['all', 'recipe', 'ingredient'].map((type) => (
    <button
      key={type}
      onClick={() => setSearchType(type)}
      style={{
        padding: '10px 20px',
        margin: '0 10px',
        borderRadius: '40px',
        border: searchType === type ? '2px solid #B55335' : '2px solid #ccc',
        backgroundColor: searchType === type ? '#B55335': '#fff',
        color: searchType === type ? '#fff' : '#B55335',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      {type === 'all' ? 'Search All' : type === 'recipe' ? 'By Recipe Name' : 'By Ingredient'}
    </button>
  ))}
</div>


{/* Selected Ingredients */}
<div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
  {selectedIngredients.map((ingredient, index) => (
    <div
      key={index}
      style={{
        padding: '8px 12px',
        backgroundColor: '#8B4513',
        color: '#fff',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      {ingredient}
      <button
        onClick={() =>
          setSelectedIngredients((prev) =>
            prev.filter((_, i) => i !== index) // Remove ingredient on click
          )
        }
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>
  ))}
</div>

{/* Suggestions Dropdown */}
{searchType === 'ingredient' && suggestedIngredients.length > 0 && (
  <ul
    style={{
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '100%',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '0 0 10px 10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      listStyleType: 'none',
      padding: '10px 0',
      margin: '0',
    }}
  >
    {suggestedIngredients.map((ingredient, index) => (
      <li
        key={index}
        onClick={() => {
          setSelectedIngredients((prev) => [...prev, ingredient.IngredientName]); // Add the ingredient to selectedIngredients
          setSearchTerm(''); // Clear the search input
          setSuggestedIngredients([]); // Clear the dropdown
        }}
        style={{
          padding: '10px',
          cursor: 'pointer',
          borderBottom: '1px solid #eee',
        }}
      >
        {ingredient.IngredientName}
      </li>
    ))}
  </ul>
)}

{/* Recipe Search Suggestions */}
{searchType !== 'ingredient' && suggestions.length > 0 && (
  <ul
    style={{
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '100%',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '0 0 10px 10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      listStyleType: 'none',
      padding: '10px 0',
      margin: '0',
    }}
  >
    {suggestions.map((recipe) => (
      <li
        key={recipe.RecipeID}
        onClick={() => {
          navigate(`/recipe-view/${recipe.RecipeID}`); // Navigate directly to the recipe page
        }}
        style={{
          padding: '10px',
          cursor: 'pointer',
          borderBottom: '1px solid #eee',
        }}
      >
        {recipe.RecipeTitle}
      </li>
    ))}
  </ul>
)}

</div>
      {/* Grid Section */}
      <div style={styles.gridSection}>
  {categories.map((category, index) => (
    <Link
      to="/category" // Redirect to the reusable `CategoryPage`
      state={{
        img: category.img, 
        label: category.label, 
        apiPath: `/api/recipes?themeName=${category.label}`
      }} // Pass the necessary data
      key={index}
      style={{ textDecoration: 'none' }}
    >
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
        <img src={category.img} alt={category.label} style={styles.gridImage} />
        <span style={styles.gridLabel}>{category.label}</span>
      </div>
    </Link>
  ))}
</div>

    </div>
  );
}

export default HomePage;
