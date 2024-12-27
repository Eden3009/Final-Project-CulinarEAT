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
  list: {
    paddingLeft: '20px',
  },
  listItem: {
    marginBottom: '5px',
    fontSize: '16px',
  },
  instructions: {
    listStyleType: 'decimal',
    paddingLeft: '20px',
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#333',
  },
};

function RecipeViewPage() {
  const { RecipeID } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

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
      <img
  src={recipe.ImageURL ? './images/lunch.png' : lunchImage}
  alt={recipe.RecipeTitle || 'Recipe Image'}
  style={styles.heroImage}
/>


      {/* Title */}
      <h1 style={styles.title}>{recipe.RecipeTitle || 'Untitled Recipe'}</h1>

      {/* Meta Info */}
      <div style={styles.metaInfo}>
        <div><strong>Level:</strong> {recipe.SkillLevel || 'N/A'}</div>
        <div><strong>Rating:</strong> {recipe.AverageRating || 'Not Rated'}</div>
        <div><strong>Yield:</strong> {recipe.yield || 'N/A'}</div>
      </div>

      {/* Description */}
      {recipe.RecipeDescription && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Description</h2>
          <p>{recipe.RecipeDescription}</p>
        </div>
      )}

      {/* Ingredients */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Ingredients</h2>
        <ul style={styles.list}>
          {ingredients.map((ingredient, index) => (
            <li key={index} style={styles.listItem}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Directions</h2>
        <ol style={styles.instructions}>
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
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
                <p><strong>{review.User}:</strong> {review.Comment}</p>
                <p><em>Rating: {review.Rating}</em></p>
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
