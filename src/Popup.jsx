import React from 'react';

const styles = {
  popupContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px 40px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
  },
  emoji: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '20px',
    color: '#d77a65',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  message: {
    fontSize: '16px',
    color: '#333',
  },
};

function Popup({ message, title = 'Success!' }) {
  return (
    <div style={styles.popupContainer}>
      <div style={styles.emoji}>🎉</div>
      <div style={styles.title}>{title}</div>
      <div style={styles.message}>{message}</div>
    </div>
  );
}

export default Popup;
