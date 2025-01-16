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
import { Add, Remove } from '@mui/icons-material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Adjust path as needed
//import { WhatsApp } from '@mui/icons-material';
import { Edit, Delete, WhatsApp } from '@mui/icons-material';


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
  fontFamily: 'Georgia, serif',
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
const [listName, setListName] = useState('');
const [savedLists, setSavedLists] = useState([]);
const [isAdding, setIsAdding] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [editingListId, setEditingListId] = useState(null); // To track which list is being edited
const [isEditingItem, setIsEditingItem] = useState(false); // Track if editing an item
const [editingIndex, setEditingIndex] = useState(null); // Track the index of the item being edited
const [expandedLists, setExpandedLists] = useState({}); // State to track expanded/collapsed lists

const resetEditingState = () => {
  setIsEditing(false);
  setEditingListId(null);
  setListName('');
  setShoppingList([]);
};

useEffect(() => {
fetch('/api/session', { credentials: 'include' })
  .then((res) => res.json())
  .then((data) => console.log('Session data:', data))
  .catch((err) => console.error('Error fetching session:', err));
}, []);

useEffect(() => {
 if (user?.UserID) {
     fetch(`http://localhost:5001/api/get-shopping-lists/${user.UserID}`)
         .then((res) => res.json())
         .then((data) => setSavedLists(data))
         .catch((error) => console.error('Error fetching shopping lists:', error));
 }
}, [user]);

useEffect(() => {
  resetEditingState(); // Reset editing state when the page loads
}, []);

useEffect(() => {
  if (savedLists.some((list) => !list.CreatedDate)) {
    console.warn('Incomplete lists detected. Refreshing data.');
    // Optionally refetch or fix the state
    setSavedLists((prev) => prev.filter((list) => list.CreatedDate));
  }
}, [savedLists]);




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




const saveToList = () => {
  // Check if the listName is valid
  if (!listName.trim()) {
    toast.error('Please enter a list name!');
    return;
  }

  // Check if shoppingList is empty
  if (shoppingList.length === 0) {
    toast.error('The shopping list is empty!');
    return;
  }

  // Log the shoppingList to confirm its structure
  console.log('Shopping List:', shoppingList);

  // Check if all items in shoppingList are valid
  const invalidIngredient = shoppingList.find((item) => {
    return !item.IngredientID || !item.MeasureID || !item.quantity || item.quantity <= 0;
  });

  if (invalidIngredient) {
    toast.error('One or more ingredients are invalid. Please check and try again.');
    return;
  }

  const payload = {
    listName, // Make sure listName is a non-empty string
    shoppingList: shoppingList.map((item) => ({
      IngredientID: item.IngredientID,
      MeasureID: item.MeasureID,
      Quantity: item.quantity,
    })),
    userId: user?.UserID,
  };

  // Log the payload being sent to backend
  console.log('Payload being sent to backend:', JSON.stringify(payload));

  // Dynamically decide the API endpoint and method
  const endpoint = isEditing
    ? `http://localhost:5001/api/update-shopping-list/${editingListId}`
    : 'http://localhost:5001/api/shopping-lists';

  const method = isEditing ? 'PUT' : 'POST';

  // Proceed to make the API call
  fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      console.log('Response status:', res.status); // Log response status
      if (!res.ok) {
        return res.json().then((err) => {
          console.error('Error response from backend:', err); // Log the error response
          return Promise.reject(err);
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log('List saved successfully:', data); // Log the successful response from the backend
      if (!isEditing) {
        // Append the new list to saved lists if creating a new one
        setSavedLists((prev) => [...prev, data.newList]);
      } else {
        // Update the saved lists if editing an existing one
        setSavedLists((prev) =>
          prev.map((list) =>
            list.ShoppingListID === editingListId
              ? { ...list, ListName: listName, items: [...shoppingList] }
              : list
          )
        );
      }
      toast.success('List saved successfully!');
      resetEditingState(); // Reset state for creating or editing
      window.location.reload();

    })
    .catch((error) => {
      console.error('Error saving list:', error); // Log any errors
      toast.error('Failed to save the list. Please try again.');
    });
};


  


const addItem = () => {
  console.log('Selected Ingredient:', selectedIngredient);
  console.log('Search Term:', searchTerm);
  console.log('Quantity:', quantity);
  console.log('Measure ID:', measure);

  if (!searchTerm.trim()) {
    toast.error('Ingredient is required!');
    return;
  }
  if (!measure) {
    toast.error('Please select a measure!');
    return;
  }
  if (!selectedIngredient || !selectedIngredient.IngredientID) {
    toast.error('Please select a valid ingredient from the suggestions!');
    return;
  }

  const parsedQuantity = parseFloat(quantity);
  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    toast.error('Please enter a valid quantity!');
    return;
  }

  if (isEditingItem && editingIndex !== null) {
    // Update the existing item in the list
    setShoppingList((prev) => {
      const updatedList = [...prev];
      updatedList[editingIndex] = {
        ...updatedList[editingIndex],
        IngredientID: selectedIngredient.IngredientID,
        IngredientName: selectedIngredient.IngredientName,
        quantity: parsedQuantity,
        MeasureID: measure,
        MeasureName: measures.find((m) => m.MeasureID === measure)?.MeasureName || '',
      };
      return updatedList;
    });

    toast.success('Item updated successfully!');
    setIsEditingItem(false); // Disable editing mode after update
    setEditingIndex(null);   // Clear the editing index
  } else {
    // Add a new ingredient if not editing
    const exists = shoppingList.some(
      (item) => item.IngredientID === selectedIngredient.IngredientID
    );

    if (exists) {
      toast.error('Ingredient already added!');
      return;
    }

    setShoppingList((prev) => [
      ...prev,
      {
        IngredientID: selectedIngredient.IngredientID,
        IngredientName: selectedIngredient.IngredientName,
        quantity: parsedQuantity,
        MeasureID: measure,
        MeasureName: measures.find((m) => m.MeasureID === measure)?.MeasureName || '',
      },
    ]);

    toast.success('Item added to the list!');
  }

  // Reset input fields after adding or updating
  setSearchTerm('');
  setQuantity(1);
  setMeasure('');
  setSelectedIngredient(null);
  setIsEditingItem(false); // Ensure editing is disabled for new item addition
  setEditingIndex(null);
};



const handleEditList = (list) => {
  console.log('handleEditList invoked with list:', list); // Log the input list

  // Check if the list is valid and contains items
  if (!list || !Array.isArray(list.items)) {
    console.error('Invalid list format or items missing:', list);
    toast.error('Cannot edit this list. Please try again.');
    return;
  }

  console.log('List is valid. Preparing to enter editing mode.');

  // Enable editing mode
  setIsEditing(true);
  console.log('Editing mode enabled.');

  // Set the editing list ID and log it
  const listId = list.ShoppingListID || 'TEMP_ID'; // Fallback for missing ID
  setEditingListId(listId);
  console.log('Editing List ID set to:', listId);

  // Set the list name and log it
  const listName = list.ListName || 'Unnamed List';
  setListName(listName);
  console.log('List name set to:', listName);

  // Map items to set them in the state, ensuring no item is marked as "editing" initially
  const mappedItems = list.items.map((item, index) => {
    console.log(`Mapping item ${index + 1}:`, item);
    return {
      IngredientID: item.IngredientID || null,
      MeasureID: item.MeasureID || null,
      quantity: item.Quantity || 1,
      label: `${item.IngredientName || 'Unknown Ingredient'} - ${item.Quantity || 1} ${item.MeasureName || ''}`.trim(),
      IngredientName: item.IngredientName || 'Unknown Ingredient',
      MeasureName: item.MeasureName || '',
      isEditing: false, // Ensure no items are being edited initially
    };
  });

  if (mappedItems.length === 0) {
    console.warn('Warning: Shopping list has no items.');
    toast.warn('This list has no items to edit.');
  }

  // Set the shopping list with mapped items and log the result
  setShoppingList(mappedItems);
  console.log('Shopping list items set for editing:', mappedItems);

  // **Clear the input fields when entering list editing mode**
  setSearchTerm('');
  setQuantity(1);
  setMeasure('');
  setSelectedIngredient(null);
  console.log('Cleared input fields for editing mode.');

  toast.info('You can now edit this list. Don’t forget to save your changes!');
};




const saveEditedList = () => {
  if (!listName.trim()) {
    toast.error('Please enter a list name!');
    return;
  }

  if (shoppingList.length === 0) {
    toast.error('The shopping list is empty!');
    return;
  }

  const invalidItem = shoppingList.find(
    (item) => !item.IngredientID || !item.MeasureID || !item.quantity || item.quantity <= 0
  );

  if (invalidItem) {
    toast.error('One or more ingredients are invalid. Please check and try again.');
    return;
  }

  const payload = {
    listName,
    items: shoppingList.map((item) => ({
      IngredientID: item.IngredientID,
      MeasureID: item.MeasureID,
      Quantity: item.quantity, // Make sure to include the quantity here
    })),
    userId: user?.UserID,
  };

  console.log('Payload being sent to backend:', JSON.stringify(payload, null, 2));

  fetch(`http://localhost:5001/api/update-shopping-list/${editingListId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject('Failed to save the list.');
      }
      return res.json();
    })
    .then((data) => {
      console.log('List updated successfully:', data);
      toast.success('List updated successfully!');

      // Update the savedLists immediately with the correct quantity
      setSavedLists((prevLists) =>
        prevLists.map((list) =>
          list.ShoppingListID === editingListId
            ? {
                ...list,
                ListName: listName,
                items: shoppingList.map((item) => ({
                  ...item,
                  Quantity: item.quantity, // Ensuring quantity is updated here
                  IngredientName: item.IngredientName,
                  MeasureName: measures.find((m) => m.MeasureID === item.MeasureID)?.MeasureName || '',
                })),
              }
            : list
        )
      );

      // Clear editing mode
      setIsEditing(false);
      setEditingListId(null);
      setListName('');
      setShoppingList([]);
      setSearchTerm('');
      setQuantity(1);
      setMeasure('');
      setSelectedIngredient(null);
    })
    .catch((error) => {
      console.error('Error saving edited list:', error);
      toast.error('Failed to save the list. Please try again.');
    });
};


  
// Only declare `handleDeleteList` once:
const handleDeleteList = (listId, index) => {
 fetch(`http://localhost:5001/api/delete-shopping-list/${listId}`, {
     method: 'DELETE',
 })
 .then((res) => {
  if (!res.ok) {
    return res.json().then((err) => Promise.reject(err)); // This ensures that you handle all errors correctly.
  }
  return res.json();
     })
     .catch((error) => {
         console.error('Error deleting shopping list:', error);
         toast.error('Failed to delete the list. Please try again.');
     });
};




// Updated `confirmDeleteList` to use `handleDeleteList`:
const confirmDeleteList = (index) => {
 toast(
   ({ closeToast }) => (
     <div style={{ textAlign: 'center' }}>
       <p>Are you sure you want to delete this list?</p>
       <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
         <Button
           variant="contained"
           color="error"
           size="small"
           onClick={() => {
             handleDeleteList(index); // Perform delete
             closeToast(); // Close the toast
           }}
           style={{
             backgroundColor: '#B55335',
             color: 'white',
             fontWeight: 'bold',
           }}
         >
           Yes
         </Button>
         <Button
           variant="outlined"
           size="small"
           onClick={() => closeToast()} // Just close the toast
           style={{
             borderColor: '#B55335',
             color: '#B55335',
             fontWeight: 'bold',
           }}
         >
           No
         </Button>
       </div>
     </div>
   ),
   {
     closeButton: false,
     autoClose: false, // Disable auto-close for user interaction
     hideProgressBar: true,
   }
 );
};




const toggleListVisibility = (listId) => {
  setExpandedLists((prev) => ({
    ...prev,
    [listId]: !prev[listId], // Toggle state for the specific list
  }));
};


const handleExportListToWhatsApp = (list) => {
 const listHeader = `*${list.listName}*\n\n`;
 const message = list.items
   .map((item) => `${item.label} - Quantity: ${item.quantity} ${item.measureName || ''}`)
   .join('\n');
 const fullMessage = `${listHeader}${message}`;
 const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
 window.open(whatsappUrl, '_blank');
};




const updateQuantity = (index, newQuantity) => {
  setShoppingList((prevList) => {
    const updatedList = prevList.map((item, i) => {
      if (i === index) {
        const updatedItem = {
          ...item,
          quantity: Math.max(1, newQuantity), // Ensure the quantity is at least 1
          label: `${item.IngredientName} - ${Math.max(1, newQuantity)} ${item.MeasureName || ''}` // Update the label
        };
        return updatedItem;
      }
      return item;
    });
    return updatedList;
  });
};


const toggleEditing = (index) => {
  const itemToEdit = shoppingList[index];

  // Separate constants for each value:
  const ingredientName = itemToEdit.IngredientName || '';
  const ingredientId = itemToEdit.IngredientID || null;
  const quantity = itemToEdit.quantity || 1;
  const measureId = itemToEdit.MeasureID || '';

  // Populate the input fields:
  setSearchTerm(ingredientName);  // Populate the ingredient field
  setQuantity(quantity);          // Populate the quantity field
  setMeasure(measureId);          // Populate the measure dropdown
  setSelectedIngredient({         // Keep ingredient details
    IngredientID: ingredientId,
    IngredientName: ingredientName,
  });

  setIsEditingItem(true);         // Enable editing mode
  setEditingIndex(index);         // Track which item is being edited

  // Mark only the current item as "editing":
  setShoppingList((prev) =>
    prev.map((item, i) => ({
      ...item,
      isEditing: i === index,  // Only the selected item is in editing mode
    }))
  );
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




const handleAddNewIngredient = async (newIngredientName) => {
 if (isAdding) return; // Prevent duplicate submissions
 setIsAdding(true);


 try {
   const response = await fetch("http://localhost:5001/api/addingredients", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ ingredientName: newIngredientName }),
   });


   if (response.ok) {
     const data = await response.json();
     alert(`"${newIngredientName}" added successfully to the database!`);
     setSuggestedIngredients((prevSuggestions) => [
       ...prevSuggestions,
       { IngredientName: newIngredientName, IngredientID: data.ingredientID },
     ]);
   } else {
     alert("Failed to add new ingredient. Please try again.");
   }
 } catch (error) {
   console.error("Error adding new ingredient:", error);
 } finally {
   setIsAdding(false); // Reset loading state
 }
};


const exportToWhatsApp = () => {
 if (shoppingList.length === 0) {
   setErrorMessageVisible(true); // Show the error message
   setTimeout(() => {
     setErrorMessageVisible(false);
   }, 3000); // Hide after 3 seconds
 } else {
   setErrorMessageVisible(false); // Hide the error message if list is not empty


   // Include the list name in the message
   const listHeader = listName.trim() ? `*${listName}*\n\n` : "Shopping List:\n\n";
   const message = shoppingList
     .map((item) => `${item.label} - Quantity: ${item.quantity} ${item.measureName || ''}`)
     .join('\n');


   const fullMessage = `${listHeader}${message}`;


   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
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
     borderRadius: '12px', // Rounded corners similar to input boxes
     overflow: 'hidden', // Ensures children buttons follow the parent’s radius
     height: '48px', // Same height as input boxes
   }}
 >
   <ToggleButton
     value="Alphabetical"
     style={{
       fontFamily: '"Source Sans Pro", sans-serif',
       fontWeight: 'bold',
       fontSize: '16px',
       color: filterType === 'Alphabetical' ? '#B55335' : '#555',
       backgroundColor: filterType === 'Alphabetical' ? '#d3d3d3' : 'transparent',
       borderRadius: '0', // Ensures no weird overlap of corner rounding
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
       backgroundColor: filterType === 'Label' ? '#d3d3d3' : 'transparent',
       borderRadius: '0', // Ensures no overlap
     }}
   >
     Label
   </ToggleButton>
 </ToggleButtonGroup>
</div>


{/* Shopping List Name Input */}
{/* Shopping List Name Input */}
<div style={{ margin: '20px 0 30px 0', width: '100%', maxWidth: '600px' }}>
 <TextField
   variant="outlined"
   label="List Name"
   value={listName}
   onChange={(e) => setListName(e.target.value)}
   style={{
     width: '100%',
     height: '48px',
     borderRadius: '12px',
     backgroundColor: 'transparent',
   }}
   InputProps={{
     style: {
       borderRadius: '12px',
     },
   }}
   InputLabelProps={{
     shrink: true,
   }}
   placeholder="Enter a name for your shopping list"
 />
</div>




{/* Form Container for Consistent Width */}
<div style={{ maxWidth: '600px', margin: '0 auto' }}>
  {/* Add Ingredient Section */}
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%' }}>
    {/* Quantity Input */}
    <TextField
      label="Quantity"
      value={quantity}
      onChange={(e) => {
        const value = e.target.value;
        if (/^[0-9./]*$/.test(value)) {
          setQuantity(value);
        }
      }}
      style={{
        flex: 1,
        height: '48px',
        borderRadius: '12px',
        backgroundColor: 'transparent',
      }}
      InputProps={{
        style: { borderRadius: '12px' },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />

    {/* Measure Dropdown */}
    <TextField
      select
      label="Select Measure"
      value={measure}
      onChange={(e) => setMeasure(e.target.value)}
      style={{
        flex: 1,
        height: '48px',
        borderRadius: '12px',
        backgroundColor: 'transparent',
      }}
      InputProps={{
        style: { borderRadius: '12px' },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    >
      <MenuItem value="" disabled>
        Select Measure
      </MenuItem>
      {measures.map((m) => (
        <MenuItem key={m.MeasureID} value={m.MeasureID}>
          {m.MeasureName}
        </MenuItem>
      ))}
    </TextField>

    {/* Search Input */}
    <div style={{ flex: 2, position: 'relative' }}>
      <TextField
        label="Search for ingredient"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelectedIngredient(null); // Clear the selected ingredient when typing
        }}
        style={{
          width: '100%',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: 'transparent',
        }}
        InputProps={{
          style: { borderRadius: '12px' },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Autocomplete Section */}
      {suggestedIngredients.length > 0 ? (
        <ul
          style={{
            position: 'absolute',
            top: '52px',
            background: '#fff',
            border: '1px solid #ddd',
            listStyle: 'none',
            margin: 0,
            padding: '5px 0',
            zIndex: 1000,
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {suggestedIngredients.map((ingredient) => (
            <li
              key={ingredient.IngredientID}
              onClick={() => {
                setSearchTerm(ingredient.IngredientName);
                setSelectedIngredient(ingredient); // Set the selected ingredient
                setSuggestedIngredients([]);
              }}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
                borderBottom: '1px solid #eee',
              }}
            >
              {ingredient.IngredientName}
            </li>
          ))}
        </ul>
      ) : (
        searchTerm && (
          <div
            style={{
              position: 'absolute',
              top: '60px',
              left: 0,
              width: '100%',
              textAlign: 'center',
              color: 'red',
              fontSize: '16px',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 'bold',
            }}
            onClick={() => handleAddNewIngredient(searchTerm)}
          >
            Item not found, to add it — click on me!
          </div>
        )
      )}
    </div>

    {/* Add Button */}
    <Button
      variant="contained"
      style={{
        backgroundColor: '#B55335',
        color: '#fff',
        borderRadius: '12px',
        height: '48px',
        width: '100px',
        fontFamily: "'Merienda', cursive",
        fontWeight: 'bold',
        fontSize: '16px',
      }}
      onClick={() => {
        if (!selectedIngredient || !selectedIngredient.IngredientName) {
          toast.error('Please select a valid ingredient!');
          console.log('No valid ingredient selected:', selectedIngredient);
          return;
        }

        if (!quantity || isNaN(quantity) || quantity <= 0) {
          toast.error('Please enter a valid quantity!');
          return;
        }

        if (!measure) {
          toast.error('Please select a measure!');
          return;
        }

        // Add item to the list
        addItem();
      }}
    >
      Add
    </Button>
  </div>
</div>

{/* Shopping List Section */}
<div style={styles.listContainer}>
  {filterType === 'Label' ? (
    Object.keys(groupedByLabel).map((label) => (
      <div key={label}>
        <Typography style={styles.categoryHeading}>{label}</Typography>
        {groupedByLabel[label].map((item, index) => (
          <div key={index} style={styles.listItem}>
            <Typography style={{ flex: 1, fontSize: '16px', fontFamily: "'Poppins', sans-serif" }}>
              {`${item.IngredientName} - ${item.quantity} ${measures.find(m => m.MeasureID === item.MeasureID)?.MeasureName || ''}`}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Button
                variant="text"
                onClick={() => toggleEditing(index)}
                style={{ color: '#007bff', padding: '0', minWidth: 'auto' }}
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
      .sort((a, b) => a.IngredientName.localeCompare(b.IngredientName))
      .map((item, index) => (
        <div key={index} style={styles.listItem}>
          <Typography style={{ flex: 1, fontSize: '16px', fontFamily: "'Poppins', sans-serif" }}>
            {`${item.IngredientName} - ${item.quantity} ${item.MeasureName || ''}`}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              variant="text"
              onClick={() => toggleEditing(index)}
              style={{ color: '#007bff', padding: '0', minWidth: 'auto' }}
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
<div style={styles.buttonRow}>
  {isEditing ? (
    <Button
      variant="contained"
      style={{
        backgroundColor: '#B55335', // Brown color for "Save Changes"
        color: '#FFF',
        fontWeight: 'bold',
        padding: '4px 10px', // Reduced padding
        fontSize: '12px', // Smaller font size
        borderRadius: '6px', // Smaller rounded edges
        fontFamily: "'Merienda', cursive",
        width: '120px', // Reduced width
        height: '50px', // Reduced height
        textAlign: 'center',
        marginTop: '10px',
      }}
      onClick={saveEditedList}
    >
      Save Changes
    </Button>
  ) : (
    <Button
      variant="contained"
      style={{
        backgroundColor: '#B55335',
        color: '#fff',
        fontWeight: 'bold',
        padding: '4px 10px',
        fontSize: '12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontFamily: "'Merienda', cursive",
        transition: 'background-color 0.3s ease',
        width: '120px',
        height: '50px',
        textAlign: 'center',
        marginTop: '10px',
      }}
      onClick={saveToList}
    >
      Save the List
    </Button>
  )}

  <Button
    variant="contained"
    style={{
      backgroundColor: '#4caf50', // Green color for "Export to WhatsApp"
      color: '#fff',
      fontWeight: 'bold',
      padding: '4px 10px',
      fontSize: '12px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontFamily: "'Merienda', cursive",
      transition: 'background-color 0.3s ease',
      width: '120px',
      height: '50px',
      textAlign: 'center',
      marginTop: '10px',
    }}
    onClick={exportToWhatsApp}
    endIcon={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="16px"
        height="16px"
      >
        <path d="M16.7 13.67c-.29-.15-1.72-.86-1.99-.96-.26-.1-.45-.15-.64.15-.2.29-.74.96-.9 1.16-.16.2-.33.22-.62.07-.29-.15-1.21-.45-2.3-1.43-.85-.76-1.42-1.7-1.59-1.98-.16-.29-.02-.45.12-.6.13-.13.29-.33.43-.49.14-.16.19-.27.29-.48.1-.21.05-.37-.03-.52-.08-.15-.64-1.55-.88-2.12-.23-.56-.47-.49-.64-.5-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.26.29-1.03 1.01-1.03 2.48 0 1.47 1.06 2.91 1.2 3.11.15.2 2.09 3.2 5.07 4.48.71.31 1.27.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.26-.7.26-1.29.18-1.42-.08-.13-.26-.2-.54-.35Z" />
        <path
          fillRule="evenodd"
          d="M12.004 2.00002C6.49 2.00002 2 6.36002 2 11.65c0 2.01.64 3.87 1.75 5.42L2 22l5.16-1.54c1.47.78 3.08 1.19 4.84 1.19 5.51 0 10-4.36 10-9.72 0-5.29-4.49-9.72-10-9.72Zm0 17.45c-1.55 0-3.02-.38-4.33-1.1l-.31-.17-3.06.92.86-2.94-.2-.31c-1.07-1.45-1.64-3.17-1.64-4.91 0-4.47 3.83-8.11 8.68-8.11 4.77 0 8.68 3.58 8.68 8.11-.01 4.47-3.84 8.11-8.68 8.11Z"
          clipRule="evenodd"
        />
      </svg>
    }
  >
    Export to WhatsApp
  </Button>
</div>


</div>
{errorMessageVisible && (
  <Typography style={styles.errorMessage}>
    The shopping list is empty. Add items before exporting or saving.
  </Typography>
)}
<ToastContainer />
</div>
<div style={{ marginTop: '30px', width: '100%', maxWidth: '800px' }}>



{/* Saved Lists */}
<div style={{ maxWidth: '800px', margin: '0 auto' }}>
  <h2
    style={{
      fontSize: '24px',
      fontFamily: "'Merienda', cursive",
      fontWeight: 'bold',
      color: '#B55335',
      textAlign: 'center',
    }}
  >
    Your Saved Lists
  </h2>

  {savedLists.map((list, index) => (
    <div
      key={list.ShoppingListID || index}
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}
    >
      {/* Date on the top left */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '20px',
          fontSize: '14px',
          color: '#777',
        }}
      >
Created on: {list.CreatedDate 
        ? new Date(list.CreatedDate).toLocaleDateString('en-GB') 
        : 'Date not available'}      </div>

      {/* List Name in the center */}
      <h3
        style={{
          margin: '0',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: "'Merienda', cursive",
        }}
      >
        {list.ListName || 'Unnamed List'}
      </h3>

      {/* Toggle Button */}
      <Button
        variant="text"
        size="small"
        onClick={() => toggleListVisibility(list.ShoppingListID || index)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '40px',
          color: '#B55335',
          padding: '0',
          minWidth: 'auto',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        {expandedLists[list.ShoppingListID || index] ? '−' : '+'}
      </Button>

      {/* Edit and Delete Icons */}
      <div
  style={{
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center', // Align icons vertically centered
    gap: '10px', // Add spacing between icons
  }}
>
  <Button
    variant="text"
    size="small"
    onClick={() => handleEditList(savedLists[index])}
    style={{ color: '#B55335', padding: '0', minWidth: 'auto' }}
  >
    <Edit />
  </Button>
  <Button
    variant="text"
    size="small"
    onClick={() => confirmDeleteList(index)}
    style={{ color: 'red', padding: '0', minWidth: 'auto' }}
  >
    <Delete />
  </Button>
  <Button
    variant="text"
    size="small"
    onClick={() => toggleListVisibility(list.ShoppingListID || index)}
    style={{
      color: '#B55335',
      padding: '0',
      minWidth: 'auto',
      fontSize: '20px',
      fontWeight: 'bold',
    }}
  >
    {expandedLists[list.ShoppingListID || index] ? '−' : '+'}
  </Button>
</div>

      {/* Expand/Collapse List Items */}
      {expandedLists[list.ShoppingListID || index] && (
        <ul
          style={{
            marginTop: '20px',
            padding: '0',
            listStyle: 'none',
            textAlign: 'center',
          }}
        >
          {list.items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '8px', fontSize: '16px' }}>
              {item.IngredientName} - {item.Quantity} {item.MeasureName || ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  ))}
</div>

</div>

   </div>
  
 )

}

export default ShoppingListPage