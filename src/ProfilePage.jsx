import React, { useState, useEffect } from 'react';

const styles = {
  profilePage: {
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    color: '#333',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#D4AF37',
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
    color: '#8B4513',
    borderBottom: '2px solid #D4AF37',
    paddingBottom: '5px',
  },
  userDetails: {
    marginBottom: '15px',
    fontSize: '18px',
    color: '#555',
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
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  saveButton: {
    backgroundColor: '#D4AF37',
    color: '#FFF',
    fontWeight: 'bold',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  saveButtonHover: {
    backgroundColor: '#B58929',
  },
};

function ProfilePage() {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

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
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password updated:', password);
    setPassword('');
    setConfirmPassword('');
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000); // Reset success message after 3 seconds
  };

  return (
    <div style={styles.profilePage}>
      <h1 style={styles.header}>{profile.username}'s Profile</h1>

      {/* Profile Information */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Profile Information</h2>
        <p style={styles.userDetails}><strong>Username:</strong> {profile.username}</p>
        <p style={styles.userDetails}><strong>Email:</strong> {profile.email}</p>
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

      {/* Change Password */}
      <div style={{ ...styles.section, ...styles.changePasswordSection }}>
        <h2 style={styles.sectionHeader}>Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button
          style={styles.saveButton}
          onClick={handlePasswordChange}
        >
          Save
        </button>
        {passwordSaved && <p style={{ color: '#28A745', marginTop: '10px' }}>Password updated successfully!</p>}
      </div>
    </div>
  );
}

export default ProfilePage;
