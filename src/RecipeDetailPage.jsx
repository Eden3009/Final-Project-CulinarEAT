import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

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

function RecipeDetailPage() {
  const { RecipeID } = useParams(); // Get RecipeID from the URL
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipe details from API
    fetch(`/api/recipe/${RecipeID}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.recipe))
      .catch((error) => console.error('Error fetching recipe:', error));
  }, [RecipeID]);

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  // Split instructions into numbered steps
  const instructions = recipe.RecipeInstructions
    ? recipe.RecipeInstructions.split('.').map((step) => step.trim()).filter((step) => step)
    : [];

  return (
    <div style={styles.page}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      {/* Hero Image */}
      <img
        src={recipe.ImageURL || 'default-image.jpg'}
        alt={recipe.RecipeTitle}
        style={styles.heroImage}
      />

      {/* Title */}
      <h1 style={styles.title}>{recipe.RecipeTitle}</h1>

      {/* Meta Info */}
      <div style={styles.metaInfo}>
        <div><strong>Level:</strong> {recipe.SkillLevel || 'N/A'}</div>
        <div><strong>Total Time:</strong> {recipe.TotalTime || 'N/A'}</div>
        <div><strong>Servings:</strong> {recipe.Servings || 'N/A'}</div>
      </div>

      {/* Ingredients */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Ingredients</h2>
        <ul style={styles.list}>
          {recipe.Ingredients.map((ingredient, index) => (
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
    </div>
  );
}

export default RecipeDetailPage;
