import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { GiChefToque } from 'react-icons/gi';




const styles = {
  pageWrapper: {
    backgroundColor: '#f9f7f4', // Desired background color
    minHeight: '100vh', // Full page height
    width: '100vw', // Full page width
    display: 'flex',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'flex-start', // Start content from the top
    padding: '20px 0', // Top and bottom padding
    boxSizing: 'border-box',
    overflowY: 'scroll', // Always show vertical scrollbar to prevent page shift
  },  
  profilePage: {
    fontFamily: "'Merienda', cursive",
    padding: '20px',
    maxWidth: '900px',
    width: '100%', // Allow it to adapt to the screen size
    color: '#333',
  },
  header: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#B55335',
    textAlign: 'center',
    marginBottom: '30px',
  },
  section: {
    padding: '20px', // Keep the padding for spacing
    marginBottom: '20px',
  },
  sectionHeader: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#B55335',
  },
  userDetails: {
    marginBottom: '15px',
    fontSize: '18px',
    color: '#555',
    fontFamily: 'Georgia, serif',
  },
  /*recipeCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#FAFAFA',
  },*/
  recipeName: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#8B4513',
  },
  reviewText: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '8px 12px',
    fontSize: '14px',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontFamily: "'Merienda', cursive",
  },
  editButton: {
    backgroundColor: '#8B4513',
  },
  deleteButton: {
    backgroundColor: '#CC0000',
  },
  changePasswordSection: {
    marginTop: '20px',
  },
  input: {
    width: '100%',
    maxWidth: '400px', // Limit the maximum width
    padding: '10px 15px', // Add horizontal padding for both sides (15px here)
    margin: '5px auto', // Center horizontally with top and bottom spacing
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box', // Ensure padding is included in the total width
    display: 'block', // Ensure it aligns properly in its container
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '-5px',
    fontFamily: 'Georgia, serif', // Updated to use Georgia font
  },
  successMessage: {
    color: '#28a745',
    fontSize: '14px',
    marginTop: '10px',
  },
  saveButton: {
    backgroundColor: '#B55335',
    color: '#FFF',
    fontWeight: 'bold',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Merienda', cursive",
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  recipeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px 0',
},
recipeCard: {
    backgroundColor: '#fff',
    borderRadius: '2px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    width: '180px',
    height:'220px',
},
recipeImage: {
    width: '180px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
},
recipeDetails: {
    textAlign: 'center',
    marginTop: '10px',
},
recipeTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#B55335',
},
recipeDescription: {
    fontSize: '14px',
    color: '#555',
    margin: '10px 0',
},
recipeRating: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: '10px',
},
viewButton: {
    backgroundColor: '#B55335',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
},
viewButtonHover: {
    backgroundColor: '#b25949',
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
divider: {
  width: '170%', // Adjust the width
  margin: '20px auto', // Center
  border: 'none',
  borderTop: '1px solid #ccc',
  position: 'relative',
  left: '50%', // Start from the center
  transform: 'translateX(-50%)', // Adjust to center the line
},
card: {
  width: '200px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  textAlign: 'center',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
},
image: {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '10px',
},
title: {
  fontSize: '18px',
  fontFamily: "'Georgia', serif",
  color: '#8B4513',
  fontWeight: 'bold',
},
comment: {
  fontSize: '14px',
  fontFamily: "'Georgia', serif",
  color: '#555',
  marginTop: '10px',
},
chefHats: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '5px',
},
chefHat: {
  width: '20px',
  height: '20px',
  margin: '0 2px',
},

  
};

function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ username: '', email: '' });
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // Add this state at the top of the component
  const [shoppingLists, setShoppingLists] = useState([]);
  const { user } = useContext(UserContext);
  const defaultImage = './images/defaultRecipeImage.jpg'; // Replace with your actual fallback image path




  useEffect(() => {
    // Fetch shopping lists
    fetch('/api/user/shoppingLists')
      .then((res) => res.json())
      .then((data) => setShoppingLists(data))
      .catch((err) => console.error(err));
  }, []);
  
  useEffect(() => {
    if (user && user.UserID) {
      console.log("Starting to fetch recipes for UserID:", user?.UserID);
  
      fetch(`http://localhost:5001/api/user/recipes?userId=${user.UserID}`)
      .then((res) => {
          console.log("Response status for recipes:", res.status);
          if (!res.ok) {
            throw new Error("Failed to fetch recipes");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched recipes data:", data);
          setRecipes(data.recipes || []); // Set recipes to state
        })
        .catch((err) => {
          console.error("Error fetching user recipes:", err);
        });
    } else {
      console.warn("User is not defined or UserID is missing:", user);
    }
  }, [user]);
  
  useEffect(() => {
    if (user && user.UserID) {
      console.log("Starting to fetch reviews for UserID:", user?.UserID);
  
      fetch(`http://localhost:5001/api/user/reviews-user?userId=${user.UserID}`)
      .then(async (res) => {
          console.log("Response status for reviews:", res.status);
          if (!res.ok) {
            throw new Error("Failed to fetch reviews");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched reviews data:", data);
          setReviews(data.reviews || []); // Set reviews to state
        })
        .catch((err) => {
          console.error("Error fetching user reviews:", err);
        });
    } else {
      console.warn("User is not defined or UserID is missing:", user);
    }
  }, [user]);
  
  

  const handlePasswordChange = () => {
    const validationErrors = {};

    // Validate password fields
    if (!password.trim()) validationErrors.password = 'Password cannot be empty.';
    if (!confirmPassword.trim()) validationErrors.confirmPassword = 'Confirm Password cannot be empty.';
    if (password && confirmPassword && password !== confirmPassword)
      validationErrors.confirmPassword = 'Passwords do not match.';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setPassword('');
      setConfirmPassword('');
      setPasswordSaved(true);
      setTimeout(() => setPasswordSaved(false), 3000);
    }
  };

  return (
    
    <div style={styles.pageWrapper}>
      <div style={styles.profilePage}>
   {/* Back Button */}
                <button style={styles.backButton} onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back
              </button>
<h1 style={styles.header}>
  {user ? `${user.UserName}'s Profile` : 'Your Profile'}
</h1>


      {/* Profile Information */}
<div style={styles.section}>
  <h2 style={styles.sectionHeader}>Profile Information</h2>
  <p style={styles.userDetails}>
    <strong>Username:</strong> {user ? user.UserName : 'Not Available'}
  </p>
  <p style={styles.userDetails}>
    <strong>Email:</strong> {user ? user.Email : 'Not Available'}
  </p>
</div>
<hr style={styles.divider} />

{/* My Recipes */}
<div style={styles.section}>
  <h2 style={styles.sectionHeader}>My Recipes</h2>
  {recipes.length > 0 ? (
    <div style={styles.recipeGrid}>
      {recipes.map((recipe) => (
        <div
          key={recipe.RecipeID}
          style={styles.recipeCard}
          onClick={() => navigate(`/recipe-view/${recipe.RecipeID}`)} // Navigate to the recipe view
        >
          {/* Recipe Image */}
          <img
            src={
              recipe.ImageURL
                ? `http://localhost:5001/images/${recipe.ImageURL}.jpg` // Assuming the backend serves images
                : require('./images/default-image.jpg') // Fallback image
            }
            alt={recipe.RecipeTitle || 'Recipe Image'}
            style={styles.recipeImage}
          />
          {/* Recipe Title */}
          <h3 style={styles.recipeTitle}>{recipe.RecipeTitle}</h3>
        </div>
      ))}
    </div>
  ) : (
    <p>No recipes added yet.</p>
  )}
</div>

<hr style={styles.divider} />

{/* My Reviews */}
<div style={styles.section}>
  <h2 style={styles.sectionHeader}>My Reviews</h2>
  {reviews.length > 0 ? (
    <div style={styles.recipeGrid}>
      {reviews.map((review) => (
        <div
          key={review.ReviewID}
          style={styles.recipeCard}
          onClick={() => navigate(`/recipe-view/${review.RecipeID}`)} // Navigate to the reviewed recipe
        >
          {/* Recipe Image */}
          <img
  src={review.ImageURL
    ? require(`./images/${review.ImageURL}.jpg`) // Dynamic import for specific images
    : require('./images/default-image.jpg')} // Fallback image
  alt={review.RecipeTitle || 'Recipe Image'}
  style={styles.recipeImage}
/>

          {/* Recipe Title */}
          <h3 style={styles.recipeTitle}>{review.RecipeTitle}</h3>
          {/* User Rating */}
          <div style={styles.chefHats}>
            {Array.from({ length: 5 }).map((_, index) => (
              <GiChefToque
                key={index}
                style={{
                  fontSize: '20px',
                  color: index < review.Rating ? '#FFD700' : '#ccc', // Gold for filled, gray for empty
                }}
              />
            ))}
          </div>
          {/* User Comment */}
          <p style={styles.recipeDescription}>
            {review.Comment || 'No comment provided.'}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p>No reviews added yet.</p>
  )}
</div>



<hr style={styles.divider} />
{/* My Shopping Lists Section */}
{/*<div tyle={style.section}>
  <h2 style={styles.sectionHeader}>My Shopping Lists</h2>
  {shoppingLists.length > 0 ? (
    shoppingLists.map((list) => (
      <div key={list.id} style={styles.recipeCard}>
        <div>
          <p style={styles.userDetails}>
            <strong>Date:</strong> {new Date(list.createdAt).toLocaleDateString()}
          </p>
          <p style={styles.userDetails}>
            <strong>Ingredients:</strong>
          </p>
          <ul>
            {list.ingredients.map((ingredient, index) => (
              <li key={index} style={styles.reviewText}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div style={styles.actionButtons}>
          <button
            style={{ ...styles.button, ...styles.editButton }}
            onClick={() => console.log(`Edit shopping list ID: ${list.id}`)}
          >
            Edit
          </button>
          <button
            style={{ ...styles.button, ...styles.deleteButton }}
            onClick={() => console.log(`Delete shopping list ID: ${list.id}`)}
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No shopping lists saved yet.</p>
  )}
</div>
*/}

        {/* Change Password */}
        <div style={{ ...styles.section, ...styles.changePasswordSection }}>
  <h2 style={styles.sectionHeader}>Change Password</h2>

  {/* New Password Input */}
  <input
    type="password"
    placeholder="New Password"
    value={password}
    onChange={(e) => {
      const value = e.target.value;
      setPassword(value);

      // Clear error if the field is empty or valid
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: value.trim() ? '' : '', // Clear error when empty
      }));
    }}
    style={styles.input}
  />
  {/* Fixed Error Area for New Password */}
  <div style={{ height: '20px', marginBottom: '10px' }}>
    {errors.password && <p style={styles.errorMessage}>{errors.password}</p>}
  </div>

  {/* Confirm Password Input */}
  <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => {
      const value = e.target.value;
      setConfirmPassword(value);

      // Clear error if the field is empty or matches the password
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: value.trim() ? '' : '', // Clear error when empty
      }));
    }}
    style={styles.input}
  />
  {/* Fixed Error Area for Confirm Password */}
  <div style={{ height: '20px', marginBottom: '20px' }}>
    {errors.confirmPassword && <p style={styles.errorMessage}>{errors.confirmPassword}</p>}
  </div>

  {/* Save Button */}
  <button
  style={{
    ...styles.saveButton,
    ...(isHovering ? { backgroundColor: '#b25949', transform: 'scale(1.05)' } : {}),
  }}
  onMouseEnter={() => setIsHovering(true)} // Trigger hover state
  onMouseLeave={() => setIsHovering(false)} // Remove hover state
  onClick={handlePasswordChange}
>
  Save
</button>

  {/* Success Message */}
  {passwordSaved && (
    <p style={{ ...styles.successMessage, marginTop: '10px' }}>Password updated successfully!</p>
  )}
</div>

      </div>
    </div>
    
  );
}

export default ProfilePage;
