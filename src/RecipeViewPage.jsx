import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import lunchImage from './images/lunch.png'; // Default image for recipes

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f7f4',
    padding: '20px',
  },contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    maxWidth: '800px',
    width: '100%',
    marginTop: '20px',
  },
  section: {
    flex: '1',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: '10px',
    textAlign: 'center',
    borderBottom: '2px solid #8B4513',
    paddingBottom: '5px',
  },
  // Update the styles for the ingredients list
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
    textAlign: 'left', // Ensure text alignment to the left
    fontSize: '18px', // Update to match the reference font size
    fontFamily: 'Georgia, serif', // Update font style to serif for aesthetic
    lineHeight: '1.8', // Improve readability with proper line height
    color: '#333', // Match font color
  },
  // Update the styles for the instructions section
  instructions: {
    listStyleType: 'decimal',
    paddingLeft: '20px',
    fontSize: '18px', // Match the updated font size for instructions
    fontFamily: 'Georgia, serif', // Serif font for consistency
    lineHeight: '1.8', // Ensure proper spacing between lines
    textAlign: 'left', // Align text to the left
    color: '#333',
  },
  
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    fontSize: '18px', // Match the updated font size
    fontFamily: 'Georgia, serif', // Ensure consistency with the list style
    lineHeight: '1.8',
  },
  listIcon: {
    color: '#8B4513',
    fontSize: '18px',
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: '20px',
    padding: '10px 15px',
    backgroundColor: '#fff',
    border: '1px solid #8B4513',
    color: '#8B4513',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: '10px',
  },
  metaInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
    fontSize: '16px',
    color: '#555',
  },
  section: {
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#8B4513',
  },
  
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px', // Add spacing between items
  },

  checkbox: {
    width: '0', // Hide the default checkbox
    height: '0',
    opacity: '0',
    position: 'absolute',
  },
  customCheckbox: {
    display: 'inline-block',
    width: '20px', // Adjust checkbox size to be slightly smaller
    height: '20px',
    border: '2px solid #8B4513', 
    borderRadius: '50%',
    backgroundColor: '#f9f7f4',
    position: 'relative',
    cursor: 'pointer',
    textAlign: 'center',
  },

  customCheckboxChecked: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  checkmark: {
    content: "'✔'",
    color: 'white',
    fontSize: '13px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'none', // Initially hidden
  },
  checkmarkVisible: {
    display: 'block', // Show when checked
  },
  separator: {
    height: '2px',
    backgroundColor: '#f0e6d6', // Very light brown
    margin: '20px 0', // Space above and below the separator
    width: '100%', // Ensures the line spans the full width
  },

  instructionsList: {
    listStyleType: 'none', // Remove default numbering
    padding: '0',
    margin: '0',
  },
  
  instructionsItem: {
    display: 'flex',
    alignItems: 'flex-start', // Align text and number at the top
    marginBottom: '20px',
  },
  
  instructionNumber: {
    color: '#8B4513', // Dark brown
    fontSize: '36px', // Larger font for numbers
    fontWeight: 'bold',
    marginRight: '15px', // Space between the number and the text
    fontFamily: 'Georgia, serif', // Font similar to the image
    lineHeight: '1', // Prevent spacing issues with number alignment
  },
  
  instructionText: {
    fontSize: '18px', // Slightly larger for better readability
    lineHeight: '1.6', // Spaced for wrapping text
    color: '#333', // Darker text color
    textAlign: 'left', // Ensure proper alignment of text
  },
  
 
};

function RecipeViewPage() {
  const { RecipeID } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const handleCheckboxChange = (event, ingredient) => {
    if (event.target.checked) {
      setCheckedIngredients((prev) => [...prev, ingredient]);
    } else {
      setCheckedIngredients((prev) =>
        prev.filter((item) => item !== ingredient)
      );
    }
  };
  
  

  useEffect(() => {
    if (RecipeID) {
      fetch(`http://localhost:5001/api/recipe/${RecipeID}`)
      .then((response) => response.json())
        .then((data) => {
          console.log('Fetched Recipe Data:', data);
          setRecipe(data.recipe);
        })
        .catch((error) => console.error('Error fetching recipe:', error));
    } else {
      console.error('Invalid RecipeID. Cannot fetch recipe.');
    }
  }, [RecipeID]);
  
  if (!recipe) {
    return <p>Loading recipe...</p>;
  }
  if (recipe && Object.keys(recipe).length === 0) {
    return <p>Recipe data not found.</p>;
  }

  // Parse and format ingredients
  // Helper function to convert decimals to fractions
  function convertToFraction(number) {
    if (Number.isInteger(number)) {
      return number.toString(); // Return the integer as a string
    }
  
    const wholePart = Math.floor(number); // Extract the whole number part
    const fractionalPart = number - wholePart;
  
    const fractions = [
      { value: 0.25, display: '¼' },
      { value: 0.33, display: '⅓' },
      { value: 0.5, display: '½' },
      { value: 0.66, display: '⅔' },
      { value: 0.75, display: '¾' },
    ];
  
    for (const fraction of fractions) {
      if (Math.abs(fractionalPart - fraction.value) < 0.01) {
        if (wholePart > 0) {
          return `${wholePart}${fraction.display}`; // Combine whole part and fraction (e.g., "3½")
        }
        return fraction.display; // Return only the fraction (e.g., "½")
      }
    }
  
    // If no match, return the number rounded to 2 decimal places
    return number.toFixed(2);
  }
  
  

// Parse and format ingredients
const ingredients = recipe.Ingredients
  ? recipe.Ingredients.split(',').map((item) => {
      const match = item.match(/^(.*) - (.*)$/);
      if (match) {
        const [, ingredientName, quantityMeasure] = match;

        const [quantity, ...rest] = quantityMeasure.split(' '); // Separate quantity from measure
        const formattedQuantity = convertToFraction(parseFloat(quantity)); // Convert quantity to fraction if needed
        const measure = rest.join(' '); // Combine remaining parts as the measure

        return `${formattedQuantity} ${measure ? measure : ''} ${ingredientName}`.trim();
      }
      return item.trim();
    })
  : [];



  // Split instructions into numbered steps
  const instructions = recipe.RecipeInstructions
  ? recipe.RecipeInstructions.split('\n').filter((step) => step.trim())
  : [];


  // Split themes and labels into arrays
  const themes = recipe.Themes ? recipe.Themes.split(',') : [];
  const labels = recipe.Labels ? recipe.Labels.split(',') : [];

  return (
    <div style={styles.page}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
  
      {/* Hero Image */}
      {/* Hero Image */}
<img
  src={recipe.ImageURL ? require(`./images/${recipe.ImageURL}.jpg`) : lunchImage}
  alt={recipe.RecipeTitle || 'Recipe Image'}
  style={styles.heroImage}
/>

  
      {/* Title */}
      <h1 style={styles.title}>{recipe.RecipeTitle || 'Untitled Recipe'}</h1>
  
      {/* Meta Info */}
      <div style={styles.metaInfo}>
        <div>
          <strong>Level:</strong> {recipe.SkillLevel || 'N/A'}
        </div>
        <div>
          <strong>Rating:</strong> {recipe.AverageRating || 'Not Rated'}
        </div>
        <div>
          <strong>Yield:</strong> {recipe.yield || 'N/A'}
        </div>
      </div>
  
      {/* Description */}
      {recipe.RecipeDescription && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Description</h2>
          <p>{recipe.RecipeDescription}</p>
        </div>
      )}
  
  <div style={styles.contentContainer}>
  {/* Ingredients Section */}
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>Ingredients</h2>
    <ul style={styles.list}>
      {ingredients.map((ingredient, index) => (
        <li key={index} style={styles.listItem}>
          <label style={styles.checkboxContainer}>
            <input
              type="checkbox"
              style={styles.checkbox} // Styled checkbox
              checked={checkedIngredients.includes(ingredient)}
              onChange={(e) => handleCheckboxChange(e, ingredient)}
            />
            <span
              style={{
                ...styles.customCheckbox,
                ...(checkedIngredients.includes(ingredient)
                  ? styles.customCheckboxChecked
                  : {}),
              }}
            >
              <span
                style={{
                  ...styles.checkmark,
                  ...(checkedIngredients.includes(ingredient)
                    ? styles.checkmarkVisible
                    : {}),
                }}
              >
                ✔
              </span>
            </span>
          </label>
          {ingredient}
        </li>
      ))}
    </ul>
  </div>

 

{/* Instructions Section */}
<div style={styles.section}>
  <h2 style={styles.sectionTitle}>Directions</h2>
  <ul style={styles.instructionsList}>
    {instructions.map((step, index) => (
      <li key={index} style={styles.instructionsItem}>
        <span style={styles.instructionNumber}>{index + 1}</span>
        <p style={styles.instructionText}>{step}</p>
      </li>
    ))}
  </ul>
</div>
</div>


  
      {/* Themes */}
      {themes.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Themes</h2>
          <p>{themes.join(', ')}</p>
        </div>
      )}
  
      {/* Labels */}
      {labels.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Labels</h2>
          <p>{labels.join(', ')}</p>
        </div>
      )}
  
      {/* Reviews */}
      {recipe.Reviews && recipe.Reviews.length > 0 ? (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Reviews</h2>
          <ul>
            {recipe.Reviews.map((review, index) => (
              <li key={index}>
                <p>
                  <strong>{review.User}:</strong> {review.Comment}
                </p>
                <p>
                  <em>Rating: {review.Rating}</em>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Reviews</h2>
          <p>No reviews available.</p>
        </div>
      )}
    </div>
  );
} 

export default RecipeViewPage;
