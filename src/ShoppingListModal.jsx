import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

Modal.setAppElement('#root'); // Adjust based on your app's root element

const ShoppingListModal = ({ isOpen, onClose, savedLists, onSubmit }) => {
  const [newListName, setNewListName] = useState('');
  const [selectedListId, setSelectedListId] = useState('');
  const [isCreatingNewList, setIsCreatingNewList] = useState(false);

  const handleOptionChange = (option) => {
    setIsCreatingNewList(option === 'new');
    setSelectedListId('');
    setNewListName('');
  };

  const handleSubmit = () => {
    if (isCreatingNewList) {
      if (!newListName.trim()) {
        toast.error('Please enter a name for the new list.');
        return;
      }
      onSubmit({ type: 'new', name: newListName });
    } else {
      if (!selectedListId) {
        toast.error('Please select an existing list.');
        return;
      }
      const selectedList = savedLists.find(
        (list) => list.ShoppingListID === parseInt(selectedListId, 10)
      );
      const selectedListName = selectedList?.ListName || '';

      if (!selectedListName.trim()) {
        toast.error('Failed to find the name for the selected list.');
        return;
      }

      onSubmit({ type: 'existing', listId: selectedListId, name: selectedListName });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add to Shopping List"
      style={{
        content: {
          width: '450px',
          height: '400px',
          margin: 'auto',
          borderRadius: '16px',
          padding: '30px',
          backgroundColor: '#FAF9F6', // Matching modal background color
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          fontFamily: "'Poppins', sans-serif",
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker overlay
        },
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontFamily: "'Merienda', cursive",
          fontSize: '28px',
          color: '#B55335', // Consistent with your theme
        }}
      >
        Add to Shopping List
      </h2>
      <div style={{ marginTop: '30px' }}>
        <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
          <input
            type="radio"
            value="new"
            checked={isCreatingNewList}
            onChange={() => handleOptionChange('new')}
            style={{ marginRight: '8px' }}
          />
          Create a New List
        </label>
        {isCreatingNewList && (
          <input
            type="text"
            placeholder="Enter new list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginTop: '12px',
              fontFamily: "'Georgia', serif",
            }}
          />
        )}
        <label
          style={{
            display: 'block',
            marginTop: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          <input
            type="radio"
            value="existing"
            checked={!isCreatingNewList}
            onChange={() => handleOptionChange('existing')}
            style={{ marginRight: '8px' }}
          />
          Add to Existing List
        </label>
        {!isCreatingNewList && (
          <select
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginTop: '12px',
              fontFamily: "'Georgia', serif",
            }}
          >
            <option value="">Select a list</option>
            {savedLists.map((list) => (
              <option key={list.ShoppingListID} value={list.ShoppingListID}>
                {list.ListName}
              </option>
            ))}
          </select>
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#B55335',
            color: '#fff',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: "'Merienda', cursive",
            fontSize: '16px',
            marginRight: '10px',
          }}
        >
          Submit
        </button>
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#ccc',
            color: '#000',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: "'Merienda', cursive",
            fontSize: '16px',
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ShoppingListModal;
