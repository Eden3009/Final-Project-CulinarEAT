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
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



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
    flexDirection: 'column', // Ensure that the error message goes beneath
    alignItems: 'center',
    gap: '10px',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row', // Side by side buttons
    gap: '10px',
    justifyContent: 'center',
  },
  
exportButton: {
  backgroundColor: '#d77a65',
  color: '#FFF',
  fontWeight: 'bold',
  padding: '8px 16px', // Reduced padding to make the button more compact
  fontSize: '14px', // Reduced font size
  borderRadius: '5px',
  cursor: 'pointer',
  fontFamily: "'Merienda', cursive",
  transition: 'background-color 0.3s ease',
  width: '150px', // Reduced the width to 150px
  textAlign: 'center',
},
saveButton: {
  backgroundColor: '#4caf50',
  color: '#FFF',
  fontWeight: 'bold',
  padding: '8px 16px', // Reduced padding to match the export button
  fontSize: '14px', // Reduced font size to match
  borderRadius: '5px',
  cursor: 'pointer',
  fontFamily: "'Merienda', cursive",
  transition: 'background-color 0.3s ease',
  width: '150px', // Same width as the export button
  textAlign: 'center',
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
  const [filterType, setFilterType] = useState('Label');
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate(); // Add the `useNavigate` hook for navigation


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
        { label: selectedIngredient, quantity: 1, unit: 'unit', category: 'Uncategorized', isEditing: false },
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

  const updateUnit = (index, newUnit) => {
    const updatedList = shoppingList.map((item, i) =>
      i === index ? { ...item, unit: newUnit } : item
    );
    setShoppingList(updatedList);
  };
  
  const groupedByLabel = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  const saveToProfile = () => {
    if (shoppingList.length === 0) {
      // Show the regular error message
      setErrorMessageVisible(true);
  
      // Hide the error message after 3 seconds, regardless of what happens
      setTimeout(() => {
        setErrorMessageVisible(false);
      }, 3000); // 3 seconds
    } else {
      setErrorMessageVisible(false); // Hide regular error message if it was showing
      toast.success('Shopping list saved successfully!', {
        position: "top-center",
        autoClose: 2000, // Closes after 2 seconds
        transition: Slide,
      });
      setTimeout(() => {
        navigate('/profile'); // Redirect to the profile page
      }, 2000); // Redirect after the toast disappears
    }
  };
  
  
  
  const exportToWhatsApp = () => {
    if (shoppingList.length === 0) {
      setErrorMessageVisible(true); // Show the error message
  
      // Hide the error message after 3 seconds
      setTimeout(() => {
        setErrorMessageVisible(false);
      }, 3000); // 3 seconds
    } else {
      setErrorMessageVisible(false); // Hide the error message if list is not empty
      const message = shoppingList
      .map((item) => `${item.label} - Quantity: ${item.quantity} ${item.unit}`)
      .join('%0A');
    
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
      value="Label"
      style={{
        fontFamily: '"Source Sans Pro", sans-serif',
        fontWeight: 'bold',
        fontSize: '16px',
        color: filterType === 'Label' ? '#d77a65' : '#555',
        borderRadius: '0 8px 8px 0',
        backgroundColor: filterType === 'Label' ? '#d3d3d3' : 'transparent', // Darker gray when selected
      }}
    >
      Label
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
        {filterType === 'Label' ? (
          Object.keys(groupedByLabel).map((label) => (
            <div key={label}>
              <Typography style={styles.categoryHeading}>{label}</Typography>
              {groupedByLabel[label].map((item, index) => (
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
  <Typography>{item.quantity}</Typography>
  <FormControl variant="outlined" size="small" style={{ width: '80px' }}>
    <Select
      value={item.unit || 'unit'}
      onChange={(e) => updateUnit(index, e.target.value)}
    >
      <MenuItem value="unit">unit</MenuItem>
      <MenuItem value="g">g</MenuItem>
      <MenuItem value="kg">kg</MenuItem>
      <MenuItem value="ml">ml</MenuItem>
      <MenuItem value="l">l</MenuItem>
      <MenuItem value="tsp">tsp</MenuItem>
      <MenuItem value="tbsp">tbsp</MenuItem>
      <MenuItem value="cup">cup</MenuItem>
    </Select>
  </FormControl>
</div>


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

      <div style={styles.exportContainer}>
  <div style={styles.buttonRow}>
    <Button
      variant="contained"
      style={styles.exportButton}
      onClick={exportToWhatsApp}
    >
      Export to WhatsApp
    </Button>
    <Button
      variant="contained"
      style={styles.saveButton}
      onClick={saveToProfile}
    >
      Save to Profile
    </Button>
  </div>
  {errorMessageVisible && (
    <Typography style={styles.errorMessage}>
      The shopping list is empty. Add items before exporting or saving.
    </Typography>
  )}
<ToastContainer />
</div>

    </div>
  );
}

export default ShoppingListPage;
