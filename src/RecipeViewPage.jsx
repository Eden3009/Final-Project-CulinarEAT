import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import lunchImage from './images/lunch.png'; // Default image for recipes
import { GiChefToque } from 'react-icons/gi'; // Import chef hat icon
import { FaCheckCircle } from 'react-icons/fa'; // Icon for completed steps
import { MdOutlineDirections } from 'react-icons/md';
import { FaTag } from 'react-icons/fa'; // FontAwesome Tag icon
import { MdLabelOutline } from 'react-icons/md'; // Import Material Design Label Outline Icon
import { AiOutlineTag } from 'react-icons/ai'; // Import gray outline tag icon
import { AiOutlineUser, AiOutlineFieldNumber, AiOutlineClockCircle } from 'react-icons/ai';

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
    position: 'absolute',
    top: '20px',
    left: '10px', 
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    padding: '80px 12px',
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
      console.log('RecipeID from params:', RecipeID);  // Add this to check the ID
      fetch(`http://localhost:5001/api/recipe/${RecipeID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched Recipe Data:', data);  // Log the fetched data
          setRecipe(data.recipe);
        })
        .catch((error) => console.error('Error fetching recipe:', error));
    } else {
      console.error('Invalid RecipeID. Cannot fetch recipe.');
    }
  }, [RecipeID]);
  

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
const ingredients = recipe && recipe.Ingredients
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
  : [];  // If `recipe.Ingredients` is null, return an empty list
  if (!recipe) {
    return <p>Loading recipe...</p>;  // Return a loading message until the data is fetched
  }
  
  // Split instructions into numbered steps
  const instructions = recipe.RecipeInstructions
  ? recipe.RecipeInstructions.split('\n').filter((step) => step.trim())
  : [];

  // Split themes and labels into arrays
  const themes = recipe.Themes ? recipe.Themes.split(',') : [];
  const labels = recipe.Labels ? recipe.Labels.split(',') : [];

  const renderChefHats = (rating) => {
    const maxHats = 5; // Maximum number of hats
    const hats = Math.round(rating); // Round to nearest integer
  
    return (
      <div style={{ display: 'flex', gap: '5px' }}>
        {Array.from({ length: maxHats }, (_, index) => (
          <span
            key={index}
            style={{
              fontSize: '20px',
              color: index < hats ? '#FFD700' : '#ccc', // Gold for filled, grey for empty
            }}
          >
            🍳 {/* Chef hat emoji */}
          </span>
        ))}
      </div>
    );
  };
  
  return (
    <div style={styles.page}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
     
 {/* Hero Section */}
<div style={{ textAlign: 'center', marginBottom: '30px' }}>
  <img
    src={recipe.ImageURL ? require(`./images/${recipe.ImageURL}.jpg`) : lunchImage}
    alt={recipe.RecipeTitle || 'Recipe Image'}
    style={{
      width: '100%',
      maxWidth: '600px',  // Match size in the example
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',  // Softer shadow
      marginBottom: '10px',
    }}
  />
  <h1 style={{
    fontSize: '40px',
    fontFamily: "'Merienda', cursive",
    fontWeight: 'bold',
    color: '#4E342E',  // Dark chocolate color
    marginBottom: '5px',
  }}>
    {recipe.RecipeTitle || 'Untitled Recipe'}
  </h1>
  <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#555', marginBottom: '10px' }}>
    by: {recipe.AuthorName || 'Unknown Author'}
  </p>

  {/* Rating Section */}
  <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '10px' }}>
    {Array.from({ length: 5 }, (_, index) => (
      <GiChefToque
        key={index}
        style={{
          fontSize: '30px',
          color: index < (recipe.AverageRating || 0) ? '#FFD700' : '#ccc', // Gold for selected, gray for unselected
        }}
      />
    ))}
  </div>
  <p style={{ fontSize: '14px', marginTop: '5px', color: '#555' }}>
    {recipe.AverageRating ? `${recipe.AverageRating}/5` : 'Not Rated Yet'}
  </p>

  {/* Description Section */}
  {recipe.RecipeDescription && (
    <div style={{
      marginTop: '10px',
      textAlign: 'center',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <p style={{ fontSize: '18px', lineHeight: '1.6', fontStyle: 'italic', color: '#555' }}>
        {recipe.RecipeDescription}
      </p>
    </div>
  )}
</div>

{/* Meta Info Section */}
<div style={{
  display: 'flex',
  justifyContent: 'space-around',  // Adds space between items
  maxWidth: '1000px',  // Wider container for more spacing
  margin: '0 auto',
  paddingBottom: '10px',
}}>
  {/* Skill Level */}
  <div style={{
    textAlign: 'center',
    marginRight: '30px',  // Add spacing between sections
  }}>
    <p style={{
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#4E342E',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
    }}>
      <AiOutlineUser style={{ fontSize: '20px', color: '#666' }} />
      Skill Level
    </p>
    <p style={{ fontSize: '18px', color: '#333' }}>{recipe.SkillLevel || 'N/A'}</p>
  </div>

  {/* Yield */}
  <div style={{
    textAlign: 'center',
    marginRight: '30px',  // Add spacing between sections
  }}>
    <p style={{
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#4E342E',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
    }}>
      <AiOutlineFieldNumber style={{ fontSize: '20px', color: '#666' }} />
      Yield
    </p>
    <p style={{ fontSize: '18px', color: '#333' }}>{recipe.Yield || 'N/A'}</p>
  </div>

  {/* Prep Time */}
  <div style={{
    textAlign: 'center',
    marginRight: '30px',  // Add spacing between sections
  }}>
    <p style={{
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#4E342E',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
    }}>
      <AiOutlineClockCircle style={{ fontSize: '20px', color: '#666' }} />
      Prep Time
    </p>
    <p style={{ fontSize: '18px', color: '#333' }}>{recipe.PreparationTime || 'N/A'}</p>
  </div>

  {/* Total Time */}
  <div style={{ textAlign: 'center' }}>
    <p style={{
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#4E342E',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
    }}>
      <AiOutlineClockCircle style={{ fontSize: '20px', color: '#666' }} />
      Total Time
    </p>
    <p style={{ fontSize: '18px', color: '#333' }}>{recipe.TotalTime || 'N/A'}</p>
  </div>
</div>

{/* Long Horizontal Line */}
<div style={{
  width: '90%',  // Line spans 80% of the width
  height: '2px',
  backgroundColor: '#E0E0E0',
  margin: '20px auto 30px',  // Adds spacing above and below the line
}}>
</div>


{/* Ingredients and Directions Container */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '30px' }}>
{/* Ingredients and Instructions Container */}
<div style={{
  display: 'flex',
  gap: '40px',  // Space between the sections
  alignItems: 'flex-start',
  padding: '20px 0',
}}>

  {/* Ingredients Section */}
<div style={{
  flex: '1',
  textAlign: 'left',
  paddingRight: '40px',
  paddingLeft: '40px',  // Added left padding to move it away from the edge
  borderRight: '2px solid #E0E0E0',  // Single vertical line for separation
}}>
  <h2 style={{
    fontSize: '26px',
    fontWeight: 'bold',
    fontFamily: "'Georgia', serif",
    color: '#4E342E',
    marginBottom: '15px',
  }}>
    Ingredients
  </h2>
  <ul style={{
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    fontSize: '18px',
    lineHeight: '1.8',
    fontFamily: "'Georgia', serif",
    color: '#333',
  }}>
    {ingredients.map((ingredient, index) => (
      <li key={index} style={{
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        {/* Custom Checkbox */}
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            style={{
              appearance: 'none',  // Hide default checkbox
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              border: '1px solid #8B4513',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onChange={(e) => handleCheckboxChange(e, ingredient)}
            onMouseEnter={(e) => {
              if (!e.target.checked) e.target.style.backgroundColor = '#F5F5DC';  // Beige hover effect
            }}
            onMouseLeave={(e) => {
              if (!e.target.checked) e.target.style.backgroundColor = 'transparent';  // Reset hover
            }}
            onClick={(e) => {
              e.target.style.backgroundColor = e.target.checked ? '#8B4513' : 'transparent';
              e.target.style.transform = 'scale(1.1)';
              setTimeout(() => (e.target.style.transform = 'scale(1)'), 200);  // Reset scale
            }}
          />
          {/* Ingredient Text */}
          <span style={{ marginLeft: '10px' }}>{ingredient}</span>
        </label>
      </li>
    ))}
  </ul>
</div>

  {/* Instructions Section */}
  <div style={{
    flex: '2',
    paddingLeft: '20px',  // Ensure enough space
  }}>
    <h2 style={{
      fontSize: '26px',  // Same size as "Ingredients" headline
      fontWeight: 'bold',
      fontFamily: "'Georgia', serif",
      color: '#4E342E',
      textAlign: 'left',  // Align same as "Ingredients"
      marginBottom: '20px',
    }}>
      Directions
    </h2>
    <ol style={{
      padding: '0',
      margin: '0',
      listStyleType: 'none',
      textAlign: 'left',
    }}>
      {instructions.map((step, index) => (
        <li key={index} style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '20px',
          gap: '15px',
        }}>
          {/* Number without circle */}
          <div style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#8B4513',
            minWidth: '30px',
            textAlign: 'center',
          }}>
            {index + 1}.
          </div>
          {/* Instruction Text */}
          <p style={{
            margin: 0,
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: "'Georgia', serif",
            color: '#333',
          }}>
            {step}
          </p>
        </li>
      ))}
    </ol>
  </div>

</div>


</div>
  
   {/* Themes and Labels Section */}
<div style={{ margin: '40px 0', fontFamily: 'Arial, sans-serif' }}>
  {/* Themes Section */}
<div style={{ marginBottom: '20px', textAlign: 'center' }}>
  <h2 style={{
    fontSize: '24px',  // Same size as other headlines
    fontWeight: 'bold',
    fontFamily: "'Georgia', serif",  // Same font as Ingredients/Directions
    color: '#4E342E',  // Consistent dark brown color
    marginBottom: '12px',
  }}>
    Recipe Themes
  </h2>
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    padding: '8px',
  }}>
    {themes.map((theme, index) => (
      <div
        key={index}
        style={{
          padding: '10px 16px',
          backgroundColor: '#FAF9F6',
          color: '#5A5A5A',
          borderRadius: '12px',
          fontSize: '16px',
          fontFamily: "'Georgia', serif",  // Same font for theme text
          fontWeight: 'bold',
          minWidth: '100px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          textTransform: 'capitalize',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'default',
          border: '1px solid #E0E0E0',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        }}
      >
        {theme}
      </div>
    ))}
  </div>
</div>




{/* Labels Section with Elegant Gray Tag Icon */} 
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '40px',
  gap: '10px', // Space between the icon and labels
}}>
  {/* Gray Tag Icon */}
  <AiOutlineTag style={{
    fontSize: '28px', // Icon size
    color: '#777', // Neutral gray color
  }} />

  {/* Labels Row */}
  <div style={{
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  }}>
    {labels.map((label, index) => (
      <span
        key={index}
        style={{
          fontSize: '20px',
          fontFamily: "'Georgia', serif",
          fontWeight: '500',
          color: '#4E342E',
          borderBottom: '2px solid transparent',
          cursor: 'default',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderBottom = '2px solid #8B4513'; // Underline on hover
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderBottom = '2px solid transparent'; // Remove underline
        }}
      >
        {label}
      </span>
    ))}
  </div>
</div>



</div>

  
      

{/* Reviews Section */}
<div style={{ marginTop: '40px', textAlign: 'center' }}>
  <h2 style={{
    fontSize: '26px',
    fontWeight: 'bold',
    fontFamily: "'Georgia', serif",
    color: '#4E342E',
    marginBottom: '20px',
  }}>
    Reviews
  </h2>

  {recipe.Reviews && recipe.Reviews.length > 0 ? (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxWidth: '700px',
      margin: '0 auto',
    }}>
      {recipe.Reviews.map((review, index) => (
        <div key={index} style={{
          backgroundColor: '#F9F7F4',  // Subtle beige background
          border: '1px solid #E0E0E0',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <strong style={{
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: "'Georgia', serif",
              color: '#4E342E',
            }}>
              {review.User || 'Anonymous'}
            </strong>
            <span style={{ fontSize: '14px', color: '#777' }}>
              {review.Timestamp || 'No Date'}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '5px',
            marginBottom: '10px',
          }}>
            {/* Chef Hat Icons for Rating */}
            {Array.from({ length: 5 }).map((_, i) => (
              <GiChefToque
                key={i}
                style={{
                  fontSize: '24px',
                  color: i < review.Rating ? '#FFD700' : '#ccc', // Gold for filled hats, gray for empty
                }}
              />
            ))}
          </div>

          <p style={{
            fontSize: '18px',
            fontFamily: "'Georgia', serif",
            color: '#333',
            lineHeight: '1.6',
            margin: 0,
          }}>
            {review.Comment || 'No comment provided.'}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p style={{
      fontSize: '18px',
      fontFamily: "'Georgia', serif",
      color: '#555',
    }}>
      No reviews available.
    </p>
  )}
</div>

    </div>
  );
} 

export default RecipeViewPage;
