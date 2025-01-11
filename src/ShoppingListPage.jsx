import React, { useState, useEffect, useContext } from 'react';
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
import { UserContext } from './UserContext'; // Adjust path as needed



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
    color: '#B55335', 
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
    backgroundColor: '#B55335', // Updated button color
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
  backgroundColor: '#B55335',
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
  const { user } = React.useContext(UserContext); // Access `UserContext` at the top level
  const [shoppingList, setShoppingList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [filterType, setFilterType] = useState('Label');
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();
  const [measures, setMeasures] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [measure, setMeasure] = useState('');
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
const searchType = 'ingredient'; // Hardcoded to 'ingredient' since we're only handling ingredient suggestions

useEffect(() => {
  fetch('/api/session', { credentials: 'include' })
    .then((res) => res.json())
    .then((data) => console.log('Session data:', data))
    .catch((err) => console.error('Error fetching session:', err));
}, []);


// Fetch suggestions dynamically
// Fetch suggestions dynamically
 useEffect(() => {
    if (searchType === 'ingredient' && searchTerm.length > 0) {
        // Fetch suggestions for autocomplete
        fetch(`http://localhost:5001/api/search?query=${searchTerm}&type=ingredient&action=autocomplete`)
            .then((res) => res.json())
            .then((data) => setSuggestedIngredients(data.ingredients || []))
            .catch((error) => console.error('Error fetching ingredient suggestions:', error));
    }  else {
        setSuggestedIngredients([]);
        setSuggestions([]);
    }
}, [searchTerm, searchType]);



  // Fetch measures from the backend
  useEffect(() => {
    const fetchMeasures = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/measures');
        const data = await response.json();
        setMeasures(data); // Assuming API returns an array of { MeasureID, MeasureName }
      } catch (error) {
        console.error('Error fetching measures:', error);
      }
    };
  
    fetchMeasures();
  }, []);

  const saveToProfile = async () => {
    console.log('Shopping List Data:', shoppingList); // Log for debugging
  
    if (shoppingList.length === 0) {
      setErrorMessageVisible(true);
      setTimeout(() => setErrorMessageVisible(false), 3000);
      return;
    }
  
    const invalidItems = shoppingList.filter(item => !item.ingredientId);
    if (invalidItems.length > 0) {
      console.error('Invalid items in shopping list:', invalidItems);
      toast.error('Some items are missing valid ingredients. Please fix them.');
      return;
    }
  
    if (!user?.UserID) {
      toast.error('User not logged in. Cannot save shopping list.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5001/api/shopping-lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shoppingList,
          userId: user.UserID,
        }),
        credentials: 'include',
      });
  
      if (response.ok) {
        toast.success('Shopping list saved successfully!');
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        const error = await response.json();
        console.error('Error saving shopping list:', error);
        toast.error('Failed to save shopping list.');
      }
    } catch (error) {
      console.error('Error saving shopping list:', error);
      toast.error('Failed to save shopping list.');
    }
  };
  

  
const addItem = () => {
  if (!searchTerm.trim()) {
    toast.error('Ingredient is required!');
    return;
  }
  if (!measure) {
    toast.error('Please select a measure!');
    return;
  }
  if (!selectedIngredient?.IngredientID) {
    toast.error('Please select a valid ingredient from the suggestions!');
    return;
  }

  const exists = shoppingList.some(
    (item) => item.label.toLowerCase() === searchTerm.toLowerCase()
  );

  if (exists) {
    toast.error('Ingredient already added!');
    return;
  }

  setShoppingList((prev) => [
    ...prev,
    {
      label: searchTerm,
      ingredientId: selectedIngredient.IngredientID, // Ensure this is valid
      quantity,
      measureId: measure,
      measureName: measures.find((m) => m.MeasureID === measure)?.MeasureName || '',
    },
  ]);

  // Reset fields
  setSearchTerm('');
  setQuantity(1);
  setMeasure('');
  setSelectedIngredient(null);
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
        color: filterType === 'Alphabetical' ? '#B55335' : '#555',
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
        color: filterType === 'Label' ? '#B55335' : '#555',
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
  {/* Quantity Input */}
  <TextField
    type="number"
    label="Quantity"
    value={quantity}
    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
    style={{ width: '80px' }}
  />

  {/* Measure Dropdown */}
  <FormControl style={{ width: '120px' }}>
    <Select
      value={measure}
      onChange={(e) => setMeasure(e.target.value)}
      displayEmpty
    >
      <MenuItem value="" disabled>Select Measure</MenuItem>
      {measures.map((m) => (
        <MenuItem key={m.MeasureID} value={m.MeasureID}>
          {m.MeasureName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

{/* Ingredient Autocomplete */}
<div style={{ position: 'relative', width: '100%' }}>
  <TextField
    variant="outlined"
    label="Ingredient"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm dynamically
    fullWidth
  />
  {suggestedIngredients.length > 0 && (
    <ul style={{ 
      position: 'absolute', 
      background: '#fff', 
      border: '1px solid #ddd', 
      listStyle: 'none', 
      margin: 0, 
      padding: '10px', 
      zIndex: 1000, 
      width: '100%' 
    }}>
      {suggestedIngredients.map((ingredient) => (
       <li
       key={ingredient.IngredientID}
       onClick={() => {
         console.log('Selected Ingredient:', ingredient.ingredientId); // Debug log
         if (ingredient?.IngredientID) {
          console.log(ingredient.ingredientId)
           setSearchTerm(ingredient.IngredientName); // Set search term
           setSelectedIngredient(ingredient); // Set full ingredient object
           setSuggestedIngredients([]); // Clear suggestions
         } else {
           toast.error('Invalid ingredient selected!');
         }
       }}
       style={{ padding: '5px 10px', cursor: 'pointer' }}
     >
       {ingredient.IngredientName}
     </li>
     
     
      
      ))}
    </ul>
  )}
</div>


  <Button
    variant="contained"
    style={styles.addButton}
    onClick={addItem}
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
                    <Typography>
  {item.label} - {item.quantity} {measures.find(m => m.MeasureID === item.measureId)?.MeasureName || ''}
</Typography>

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
