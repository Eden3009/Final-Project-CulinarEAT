import React, { useState, useEffect } from 'react';
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
      onSubmit({ type: 'existing', listId: selectedListId });
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
          width: '400px',
          height: '300px',
          margin: 'auto',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <h2 style={{ textAlign: 'center', fontFamily: "'Merienda', cursive" }}>
        Add to Shopping List
      </h2>
      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            value="new"
            checked={isCreatingNewList}
            onChange={() => handleOptionChange('new')}
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
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginTop: '10px',
            }}
          />
        )}
        <label style={{ display: 'block', marginTop: '20px' }}>
          <input
            type="radio"
            value="existing"
            checked={!isCreatingNewList}
            onChange={() => handleOptionChange('existing')}
          />
          Add to Existing List
        </label>
        {!isCreatingNewList && (
          <select
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginTop: '10px',
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
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#B55335',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: "'Merienda', cursive",
          }}
        >
          Submit
        </button>
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#ccc',
            color: '#000',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: "'Merienda', cursive",
            marginLeft: '10px',
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ShoppingListModal;
