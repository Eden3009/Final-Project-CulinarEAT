import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Edit, Add, Remove } from '@mui/icons-material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f7f4',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
  },
  header: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#d77a65', // Updated to match ProfilePage headline color
    fontFamily: "'Merienda', cursive", // Matching font
    textAlign: 'center',
    marginBottom: '30px',
  },
  
  filterContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  addIngredientContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  formControl: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#d77a65', // Updated button color
    color: '#fff',
    height: '56px',
    borderRadius: '8px',
    fontFamily: "'Merienda', cursive", // Matching font
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  
  listContainer: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
  },
  categoryHeading: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#8B4513',
    margin: '15px 0 5px 0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  exportContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  exportButton: {
    backgroundColor: '#d77a65', // Updated button color
    color: '#FFF',
    fontWeight: 'bold',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Merienda', cursive", // Matching font
    transition: 'background-color 0.3s ease',
  },
  
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    fontFamily: 'Georgia, serif',
  },
  

  errorBubble: {
    position: 'absolute',
    top: 'calc(100% + 5px)', // Position below the input box with some margin
    left: '10px',
    backgroundColor: '#d9534f',
    color: '#ffffff',
    padding: '5px 10px',
    fontSize: '12px',
    borderRadius: '5px',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  
  
};

function ShoppingListPage() {
  const [shoppingList, setShoppingList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [filterType, setFilterType] = useState('Category');
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [inputError, setInputError] = useState(false);



  const addItem = () => {
    if (!selectedIngredient.trim()) {
      setInputError(true);
      setTimeout(() => setInputError(false), 3000); // Hide the error bubble after 3 seconds
      return;
    }
  
    if (
      !shoppingList.some(
        (item) => item.label.toLowerCase() === selectedIngredient.toLowerCase()
      )
    ) {
      setShoppingList([
        ...shoppingList,
        { label: selectedIngredient, quantity: 1, category: 'Uncategorized', isEditing: false },
      ]);
      setSelectedIngredient('');
      setInputError(false); // Clear error when an ingredient is added
    }
  };
  
  

  const updateQuantity = (index, quantity) => {
    const updatedList = shoppingList.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setShoppingList(updatedList);
  };

  const toggleEditing = (index) => {
    const updatedList = shoppingList.map((item, i) =>
      i === index ? { ...item, isEditing: !item.isEditing } : item
    );
    setShoppingList(updatedList);
  };

  const updateIngredientName = (index, newLabel) => {
    const updatedList = shoppingList.map((item, i) =>
      i === index ? { ...item, label: newLabel } : item
    );
    setShoppingList(updatedList);
  };

  const removeItem = (index) => {
    setShoppingList(shoppingList.filter((_, i) => i !== index));
  };

  const groupedByCategory = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const exportToWhatsApp = () => {
    if (shoppingList.length === 0) {
      setErrorMessageVisible(true);
    } else {
      setErrorMessageVisible(false);
      const message = shoppingList
        .map((item) => `${item.label} - Quantity: ${item.quantity}`)
        .join('%0A'); // Line break in WhatsApp message
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        `Here is my shopping list:%0A${message}`
      )}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.header}>Shopping List</h1>

      {/* Filter By Section */}
      <div style={styles.filterContainer}>
  <ToggleButtonGroup
    value={filterType}
    exclusive
    onChange={(e, newValue) => {
      if (newValue) setFilterType(newValue); // Prevents deselection
    }}
    fullWidth
    style={{
      backgroundColor: 'transparent',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '8px',
    }}
  >
    <ToggleButton
      value="Alphabetical"
      style={{
        fontFamily: '"Source Sans Pro", sans-serif',
        fontWeight: 'bold',
        fontSize: '16px',
        color: filterType === 'Alphabetical' ? '#d77a65' : '#555',
        borderRadius: '8px 0 0 8px',
        backgroundColor: filterType === 'Alphabetical' ? '#d3d3d3' : 'transparent', // Darker gray when selected
      }}
    >
      Alphabetical
    </ToggleButton>
    <ToggleButton
      value="Category"
      style={{
        fontFamily: '"Source Sans Pro", sans-serif',
        fontWeight: 'bold',
        fontSize: '16px',
        color: filterType === 'Category' ? '#d77a65' : '#555',
        borderRadius: '0 8px 8px 0',
        backgroundColor: filterType === 'Category' ? '#d3d3d3' : 'transparent', // Darker gray when selected
      }}
    >
      Category
    </ToggleButton>
  </ToggleButtonGroup>
</div>



      {/* Add Ingredient Section */}
      <div style={styles.addIngredientContainer}>
      <div style={{ position: 'relative', width: '100%' }}>
  {inputError && (
    <div style={styles.errorBubble}>
      <span></span> Please enter an ingredient!
    </div>
  )}
  <TextField
    variant="outlined"
    label="Add Ingredient"
    value={selectedIngredient}
    onChange={(e) => setSelectedIngredient(e.target.value)}
    fullWidth
  />
</div>

  <Button
    variant="contained"
    style={styles.addButton}
    onClick={() => {
      if (!selectedIngredient.trim()) {
        setInputError(true);
        setTimeout(() => setInputError(false), 3000); // Remove the error bubble after 3 seconds
      } else {
        addItem();
      }
    }}
  >
    Add
  </Button>
</div>


      {/* Shopping List Section */}
      <div style={styles.listContainer}>
        {filterType === 'Category' ? (
          Object.keys(groupedByCategory).map((category) => (
            <div key={category}>
              <Typography style={styles.categoryHeading}>{category}</Typography>
              {groupedByCategory[category].map((item, index) => (
                <div key={index} style={styles.listItem}>
                  {item.isEditing ? (
                    <TextField
                      value={item.label}
                      onChange={(e) =>
                        updateIngredientName(index, e.target.value)
                      }
                      onBlur={() => toggleEditing(index)} // Save on blur
                      autoFocus
                    />
                  ) : (
                    <Typography>{item.label}</Typography>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Button
                      variant="text"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                    >
                      <Add />
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button
                      variant="text"
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                    >
                      <Remove />
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => toggleEditing(index)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          shoppingList
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((item, index) => (
              <div key={index} style={styles.listItem}>
                {item.isEditing ? (
                  <TextField
                    value={item.label}
                    onChange={(e) =>
                      updateIngredientName(index, e.target.value)
                    }
                    onBlur={() => toggleEditing(index)} // Save on blur
                    autoFocus
                  />
                ) : (
                  <Typography>{item.label}</Typography>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Button
                    variant="text"
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                  >
                    <Add />
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    variant="text"
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                  >
                    <Remove />
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => toggleEditing(index)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Export Section */}
      <div style={styles.exportContainer}>
        <Button
          variant="contained"
          style={styles.exportButton}
          onClick={exportToWhatsApp}
        >
          Export to WhatsApp
        </Button>
        {errorMessageVisible && (
          <Typography style={styles.errorMessage}>
            The shopping list is empty. Add items before exporting.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default ShoppingListPage;
