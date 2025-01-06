import React, { useState, useEffect } from 'react';

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
    color: '#d77a65',
    textAlign: 'center',
    marginBottom: '30px',
  },
  section: {
    backgroundColor: '#FFF',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  sectionHeader: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#d77a65',
    borderBottom: '2px solid #D4AF37',
    paddingBottom: '5px',
  },
  userDetails: {
    marginBottom: '15px',
    fontSize: '18px',
    color: '#555',
    fontFamily: 'Georgia, serif', // Change font to Georgia
  },
  recipeCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#FAFAFA',
  },
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
    backgroundColor: '#d77a65',
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
  
};

function ProfilePage() {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // Add this state at the top of the component
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    // Fetch shopping lists
    fetch('/api/user/shoppingLists')
      .then((res) => res.json())
      .then((data) => setShoppingLists(data))
      .catch((err) => console.error(err));
  }, []);
  
  
  useEffect(() => {
    // Fetch profile info
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));

    // Fetch user recipes
    fetch('/api/user/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));

    // Fetch user reviews
    fetch('/api/user/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

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
        <h1 style={styles.header}>{profile.username}'s Profile</h1>

        {/* Profile Information */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>Profile Information</h2>
          <p style={styles.userDetails}>
            <strong>Username:</strong> {profile.username}
          </p>
          <p style={styles.userDetails}>
            <strong>Email:</strong> {profile.email}
          </p>
        </div>

        {/* My Recipes */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>My Recipes</h2>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} style={styles.recipeCard}>
                <span style={styles.recipeName}>{recipe.name}</span>
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.button, ...styles.editButton }}
                    onClick={() => console.log(`Edit recipe with ID: ${recipe.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => console.log(`Delete recipe with ID: ${recipe.id}`)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes added yet.</p>
          )}
        </div>

        {/* My Reviews */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>My Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} style={styles.recipeCard}>
                <span style={styles.reviewText}>{review.text}</span>
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.button, ...styles.editButton }}
                    onClick={() => console.log(`Edit review with ID: ${review.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => console.log(`Delete review with ID: ${review.id}`)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews added yet.</p>
          )}
        </div>

{/* My Shopping Lists Section */}
<div style={styles.section}>
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
