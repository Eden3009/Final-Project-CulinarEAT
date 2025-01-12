import React, { useEffect, useState, useContext } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCartPlus } from 'react-icons/bs'; // Import a simple cart icon
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { UserContext } from './UserContext'; // Adjust path as needed





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
    color: '#d2b9af',
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
  const navigate = useNavigate();
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState({ name: '', comment: '' });
  const [hoverRating, setHoverRating] = useState(0);  // User's hover state
  const [isFavorite, setIsFavorite] = useState(false); // Track whether the recipe is in favorites
  const [measurementSystem, setMeasurementSystem] = useState('US'); // Default to US
    const { user } = React.useContext(UserContext); // Access `UserContext` at the top level
  
    const [recipe, setRecipe] = useState({
      Reviews: [], // Default empty array
      AverageRating: 0,
    });
    




    const handleReviewSubmit = async (e) => {
      e.preventDefault();
    
      console.log('Submitting review:', {
        UserID: user?.UserID,
        Rating: rating,
        Comment: reviewData.comment,
      });
    
      if (!reviewData.comment.trim() && rating === 0) {
        toast.error('Please provide a comment or a rating!');
        return;
      }
    
      const newReview = {
        UserID: user?.UserID || null,
        UserName: user?.UserName || 'Anonymous',
        Rating: rating,
        Comment: reviewData.comment,
      };
    
      try {
        const response = await fetch(`http://localhost:5001/api/recipes/${RecipeID}/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            UserID: user?.UserID,
            Rating: rating || null,
            Comment: reviewData.comment || null,
          }),
        });
    
        if (response.ok) {
          const { newReview, averageRating } = await response.json();
      
            window.location.reload();
   
          // Safely update state
          setTimeout(() => {
            setRecipe((prevRecipe) => ({
              ...prevRecipe,
              Reviews: Array.isArray(prevRecipe.Reviews)
                ? [newReview, ...prevRecipe.Reviews]
                : [newReview],
              AverageRating: averageRating,
            }));
          }, 1); // Small delay to ensure UI updates correctly
    
          setReviewData({ comment: '' });
          setRating(0);
          toast.success('Review added successfully!');
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to add review.');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        toast.error('An error occurred. Please try again.');
      }
    };
    
  
  
  const handleCheckboxChange = (event, ingredient) => {
    if (event.target.checked) {
      setCheckedIngredients((prev) => [...prev, ingredient]);
    } else {
      setCheckedIngredients((prev) =>
        prev.filter((item) => item !== ingredient)
      );
    }
  };
  

  const cleanReviews = (reviews) => {
    if (!Array.isArray(reviews)) return [];
    // Remove empty or invalid reviews
    const filteredReviews = reviews.filter(review => review?.UserName && review?.Rating);
    // Remove duplicates based on ReviewID
    const uniqueReviews = Array.from(new Map(filteredReviews.map(review => [review.ReviewID, review])).values());
    return uniqueReviews;
};
 

  
  useEffect(() => {
    if (RecipeID) {
      console.log('RecipeID from params:', RecipeID);
  
      // Fetch recipe details
      fetch(`http://localhost:5001/api/recipe/${RecipeID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched Recipe Data:', data);
          setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ...data.recipe, // Merge fetched recipe data
          }));
        })
        .catch((error) => console.error('Error fetching recipe:', error));
  
      // Fetch reviews and ratings
      fetch(`http://localhost:5001/api/recipes/${RecipeID}/reviews`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched Reviews Data:', data);
                setRecipe(prevRecipe => ({
                    ...prevRecipe,
                    Reviews: cleanReviews(data.reviews), // Clean and set reviews
                    AverageRating: data.averageRating,
                }));
            })
        .catch((error) => console.error('Error fetching reviews:', error));
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
          return `${wholePart}${fraction.display}`;  // Combined string of whole part + fraction

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
  : [];  // If recipe.Ingredients is null, return an empty list
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
    maxWidth: '600px',
    height: 'auto',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  }}
  onError={(e) => e.currentTarget.src = lunchImage} // Fallback if image not found
/>

  <h1 style={{
    fontSize: '40px',
    fontFamily: "'Merienda', cursive",
    fontWeight: 'bold',
    color: '#B55335',  // Dark chocolate color
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
  <p style={{ fontSize: '14px' }}>
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
  paddingLeft: '40px',
  borderRight: '2px solid #E0E0E0',
}}>
  <h2 style={{
    fontSize: '26px',
    fontWeight: 'bold',
    fontFamily: "'Merienda', cursive",
    color: '#B55335',
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
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            style={{
              appearance: 'none',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              border: '1px solid #B55335',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onChange={(e) => handleCheckboxChange(e, ingredient)}
            onMouseEnter={(e) => {
              if (!e.target.checked) e.target.style.backgroundColor = '#F5F5DC';
            }}
            onMouseLeave={(e) => {
              if (!e.target.checked) e.target.style.backgroundColor = 'transparent';
            }}
            onClick={(e) => {
              e.target.style.backgroundColor = e.target.checked ? '#d2b9af' : 'transparent';
              e.target.style.transform = 'scale(1.1)';
              setTimeout(() => (e.target.style.transform = 'scale(1)'), 200);
            }}
          />
          <span style={{ marginLeft: '10px' }}>{ingredient}</span>
        </label>
      </li>
    ))}
  </ul>

  {/* Buttons Section */}
  <div style={{ marginTop: '20px', textAlign: 'left' }}>
    <button
      onClick={() => {
        toast.success('The items were added successfully to your shopping list!', {
          position: "top-center",
          className: "custom-toast",
        });
      }}
      disabled={checkedIngredients.length === 0}
      style={{
        backgroundColor: checkedIngredients.length > 0 ? '#d2b9af' : '#ccc',
        color: '#fff',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: checkedIngredients.length > 0 ? 'pointer' : 'not-allowed',
        fontFamily: "'Merienda', cursive",
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'background-color 0.3s ease',
        marginBottom: '10px',  // Add spacing between the shopping list button and toggle
      }}
    >
      Add to Shopping List
      <BsCartPlus style={{ fontSize: '20px', color: '#fff' }} />
    </button>

    {/* Toggle Button for US/EU Conversion */}
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
  <button
    onClick={() => setMeasurementSystem('US')}
    style={{
      width: '120px',
      padding: '10px',
      border: '2px solid #B55335',
      borderRight: 'none', // Remove right border to merge with EU button
      borderRadius: '8px 0 0 8px',
      backgroundColor: measurementSystem === 'US' ? '#B55335' : 'transparent',
      color: measurementSystem === 'US' ? '#fff' : '#B55335',
      fontFamily: "'Merienda', cursive",
      fontWeight: 'bold',
      cursor: 'pointer',
      textAlign: 'center',
      margin: 0, // No margin to remove the gap
    }}
  >
    US
  </button>
  <button
    onClick={() => setMeasurementSystem('EU')}
    style={{
      width: '120px',
      padding: '10px',
      border: '2px solid #B55335',
      borderRadius: '0 8px 8px 0',
      backgroundColor: measurementSystem === 'EU' ? '#B55335' : 'transparent',
      color: measurementSystem === 'EU' ? '#fff' : '#B55335',
      fontFamily: "'Merienda', cursive",
      fontWeight: 'bold',
      cursor: 'pointer',
      textAlign: 'center',
      margin: 0, // No margin to remove the gap
    }}
  >
    EU
  </button>
</div>
  </div>


</div>


{/* Toast Container with Custom Styles */}
<ToastContainer
  autoClose={1800}
  hideProgressBar={true}
  closeOnClick
  pauseOnFocusLoss={false}
  pauseOnHover={false}
  style={{
    width: 'fit-content',
    margin: '0 auto',
  }}
/>
{/* Floating Save to Favorites Button */}
<div style={{
  position: 'fixed',
  top: '120px',  // Adjust this value for positioning
  right: '30px',
  zIndex: 1000,
}}>
  <button
    onClick={() => {
      setIsFavorite(!isFavorite); // Toggle favorite state
      toast.success(isFavorite ? 'Recipe removed from favorites!' : 'Recipe added to favorites!');
    }}
    style={{
      backgroundColor: '#d2b9af',
      color: '#fff',
      padding: '12px 15px',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, background-color 0.3s ease',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d2b9af')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d2b9af')}
  >
    {/* Toggle between filled and outline icon */}
    {isFavorite ? <BsBookmarkFill size={24} style={{ color: '#fff' }} /> : <BsBookmark size={24} style={{ color: '#fff' }} />}
  </button>
</div>

  {/* Instructions Section */}
  <div style={{
    flex: '2',
    paddingLeft: '20px',  // Ensure enough space
  }}>
    <h2 style={{
      fontSize: '26px',  // Same size as "Ingredients" headline
      fontWeight: 'bold',
      fontFamily: "'Merienda', cursive",
      color: '#B55335',
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
            fontSize: '26px',
            fontWeight: 'bold',
            fontFamily: "'Merienda', cursive",
            color: '#B55335',
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
    fontFamily: "'Merienda', cursive",  
    color: '#B55335',  
    marginBottom: '12px',
  }}>
   Categories
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

{/* Labels Section */} 
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
          fontSize: '18px',
          fontFamily: "'Georgia', serif",
          fontWeight: '500',
          color: '#4E342E',
          borderBottom: '2px solid transparent',
          cursor: 'default',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderBottom = '2px solid #bd988a'; // Underline on hover
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
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: "'Merienda', cursive",
    color: '#B55335',
    marginBottom: '-5px',
  }}>
    Reviews
  </h2>

  {recipe.Reviews && Array.isArray(recipe.Reviews) && recipe.Reviews.length > 0 ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
        {recipe.Reviews.map((review, index) => (
            <div key={review.ReviewID || `anonymous-${index}`} style={{
                backgroundColor: '#F9F7F4',
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
                        {review.UserName || 'Anonymous'}
                    </strong>
                    <span style={{ fontSize: '14px', color: '#777' }}>
                        {review.Date || 'No Date'}
                    </span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '5px',
                    marginBottom: '10px',
                }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <GiChefToque
                            key={i}
                            style={{
                                fontSize: '24px',
                                color: i < review.Rating ? '#FFD700' : '#ccc',
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
        color: '#333',
        margin: '20px 0',
    }}>
        {recipe.Reviews && recipe.Reviews.length === 0 ? 'No reviews yet.' : 'Loading reviews...'}
    </p>
)}



  




  {/* Add Review Form */}
  <form
    onSubmit={handleReviewSubmit}
    style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '20px 0',
    }}
  >
    <h3 style={{
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: "'Merienda', cursive",
      color: '#B55335',
      marginBottom: '-5px',
    }}>
      Add Your Review
    </h3>

    {/* Comment Input */}
    <textarea
      placeholder="Write your review here..."
      value={reviewData.comment}
      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
      style={{
        width: '700px',
        height: '100px',
        padding: '15px',
        marginBottom: '15px',
        border: '1px solid #DDD',
        borderRadius: '12px',
        fontFamily: "'Georgia', serif",
        fontSize: '16px',
        boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
        transition: 'border-color 0.3s ease',
      }}
      onFocus={(e) => e.target.style.borderColor = '#8B4513'}
      onBlur={(e) => e.target.style.borderColor = '#DDD'}
    />

    {/* Chef Hat Icons for Rating */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '20px',
    }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <GiChefToque
          key={i}
          style={{
            fontSize: '30px',
            cursor: 'pointer',
            color: i < (hoverRating || rating) ? '#FFD700' : '#ccc',
            transform: i < hoverRating ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.2s ease, color 0.3s ease',
          }}
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setRating(i + 1)}
        />
      ))}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      style={{
        backgroundColor: '#B55335',
        color: '#fff',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: "'Merienda', cursive",
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        marginTop: '10px',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A0522D')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8B4513')}
    >
      Submit Review
    </button>
  </form>
</div>
</div>


  );
} 

export default RecipeViewPage;