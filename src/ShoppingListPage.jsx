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
    color: '#8B4513',
    marginBottom: '20px',
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
    backgroundColor: '#8B4513',
    color: '#fff',
    height: '56px',
    borderRadius: '8px',
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
    backgroundColor: '#8B4513',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
  },
};

function ShoppingListPage() {
  const [shoppingList, setShoppingList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [filterType, setFilterType] = useState('Category');
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const addItem = () => {
    if (selectedIngredient && !shoppingList.some((item) => item.label.toLowerCase() === selectedIngredient.toLowerCase())) {
      setShoppingList([...shoppingList, { label: selectedIngredient, quantity: 1, category: 'Uncategorized' }]);
      setSelectedIngredient('');
    }
  };

  const updateQuantity = (index, quantity) => {
    const updatedList = shoppingList.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, quantity) } : item
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
      alert('Exporting to WhatsApp...');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Typography style={styles.header}>Shopping List</Typography>

      {/* Filter By Section */}
      <div style={styles.filterContainer}>
        <FormControl style={styles.formControl} variant="outlined">
          <InputLabel>Filter By</InputLabel>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Filter By"
          >
            <MenuItem value="Alphabetical">Alphabetical</MenuItem>
            <MenuItem value="Category">Category</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Add Ingredient Section */}
      <div style={styles.addIngredientContainer}>
        <TextField
          variant="outlined"
          label="Add Ingredient"
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value)}
          fullWidth
        />
        <Button variant="contained" style={styles.addButton} onClick={addItem}>
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
                  <Typography>{item.label}</Typography>
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
                <Typography>{item.label}</Typography>
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
