import React from 'react';

const styles = {
  card: {
    width: '280px',
    backgroundColor: '#FFF',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  content: {
    padding: '15px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: '10px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  button: {
    padding: '8px 12px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#FFF',
    transition: 'background-color 0.3s ease',
  },
  editButton: {
    backgroundColor: '#8B4513',
  },
  deleteButton: {
    backgroundColor: '#CC0000',
  },
};

function RecipeCard({ recipe, onEdit, onDelete }) {
  return (
    <div style={styles.card}>
      <img
        src={recipe.image || 'default-recipe.jpg'} // Replace with a default image if none provided
        alt={recipe.name}
        style={styles.image}
      />
      <div style={styles.content}>
        <h3 style={styles.title}>{recipe.name}</h3>
        <div style={styles.buttons}>
          <button
            style={{ ...styles.button, ...styles.editButton }}
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            style={{ ...styles.button, ...styles.deleteButton }}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
