import React, { useState } from 'react';

const styles = {
  carouselContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    margin: '20px 0',
  },
  carouselTrack: {
    display: 'flex',
    transition: 'transform 0.5s ease',
  },
  carouselItem: {
    minWidth: '25%', // 4 items per row (100% / 4)
    flexShrink: 0,
    textAlign: 'center',
    padding: '10px',
    boxSizing: 'border-box',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#B55335',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 100,
  },
  arrowLeft: {
    left: '10px',
  },
  arrowRight: {
    right: '10px',
  },
  hiddenArrow: {
    display: 'none',
  },
};

function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerRow = 4; // Number of visible items
  const maxIndex = Math.ceil(items.length / itemsPerRow) - 1; // Total slides

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={styles.carouselContainer}>
      {/* Left Arrow */}
      <button
        style={{
          ...styles.arrow,
          ...styles.arrowLeft,
          ...(currentIndex === 0 ? styles.hiddenArrow : {}),
        }}
        onClick={handlePrev}
      >
        ‹
      </button>

      {/* Carousel Track */}
      <div
        style={{
          ...styles.carouselTrack,
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} style={styles.carouselItem}>
            <img
              src={item.img}
              alt={item.label}
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <span style={{ marginTop: '10px', display: 'block', color: '#333' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        style={{
          ...styles.arrow,
          ...styles.arrowRight,
          ...(currentIndex === maxIndex ? styles.hiddenArrow : {}),
        }}
        onClick={handleNext}
      >
        ›
      </button>
    </div>
  );
}

export default Carousel;
