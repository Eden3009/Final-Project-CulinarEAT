import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    marginBottom: '1px', // Decrease space below the headline
  },
  
  heroOverlay: {
    color: '#d77a65',
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
    backgroundColor: '#D4AF37',
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
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all'); // Options: 'all', 'recipe', 'ingredient'
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
const [suggestedIngredients, setSuggestedIngredients] = useState([]);


  
  // Fetch suggestions dynamically
  useEffect(() => {
    if (searchType === 'ingredient' && searchTerm.length > 0) {
        fetch(`http://localhost:5001/api/search?query=${searchTerm}&type=ingredient`)
            .then((res) => res.json())
            .then((data) => setSuggestedIngredients(data.ingredients || []))
            .catch((error) => console.error('Error fetching ingredient suggestions:', error));
    } else if (searchTerm.length > 0) {
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
    const query = selectedIngredients.join(',');
    navigate('/category', {
      state: {
        label: `Search Results for Ingredients`,
        apiPath: `/api/search?query=${query}&type=ingredient`,
      },
    });
  } else if (searchTerm.trim()) {
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

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
    }
  };

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
    { img: quickMealsImage, label: 'Meals in 10 Minutes', apiPath: '/api/recipes?category=quick-meals' },
    { img: chickenImage, label: 'Chicken', apiPath: '/api/recipes?category=chicken' },
    { img: beefImage, label: 'Beef', apiPath: '/api/recipes?category=beef' },
    { img: asianImage, label: 'Asian', apiPath: '/api/recipes?category=asian' },
    { img: holidaysImage, label: 'Holidays', apiPath: '/api/recipes?category=holidays' },
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

  {/* Search Bar */}
  <div style={{ position: 'relative', width: '50%', margin: '20px auto' }}>
  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: '2px solid #D4AF37', borderRadius: '30px', height: '42px', overflow: 'hidden' }}>
    <input
      type="text"
      placeholder="Search recipes or ingredients..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        flex: 1,
        border: 'none',
        padding: '10px 16px',
        outline: 'none',
        fontSize: '14px',
        height: '100%',
      }}
    />
<div
  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B8860B')} // Hover effect
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D4AF37')} // Restore original color
  style={{
    backgroundColor: '#D4AF37',
    color: '#fff',
    border: 'none',
    padding: '0 20px',
    fontSize: '16px',
    height: '100%',
    cursor: 'pointer',
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  onClick={handleSearch}
>
  Search
</div>

  </div>




    {/* Search Tabs */}
<div style={{ position: 'relative', width: '50%', margin: '20px auto' }}>
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
    {['all', 'recipe', 'ingredient'].map((type) => (
      <button
        key={type}
        onClick={() => setSearchType(type)}
        style={{
          padding: '10px 20px',
          margin: '0 5px',
          borderRadius: '20px',
          border: searchType === type ? '2px solid #D4AF37' : '1px solid #D4AF37', // Matching yellow color
          backgroundColor: searchType === type ? '#D4AF37' : '#fff', // Active button background
          color: searchType === type ? '#fff' : '#D4AF37', // Text color
          cursor: 'pointer',
        }}
      >
        {type === 'all' ? 'Search All' : type === 'recipe' ? 'By Recipe Name' : 'By Ingredient'}
      </button>
    ))}
  </div>

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
        apiPath: category.apiPath
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
  type="text"
  placeholder="Search recipes or ingredients..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger the search logic when "Enter" is pressed
    }
  }}
  style={{
    width: '100%',
    padding: '15px 20px',
    borderRadius: '30px',
    border: '2px solid #8B4513',
    outline: 'none',
    fontSize: '16px',
  }}
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
