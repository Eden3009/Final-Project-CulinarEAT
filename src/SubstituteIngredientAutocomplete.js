import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
`;

const Dropdown = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  position: absolute;
  width: 100%;
  background: white;
  z-index: 10;
  max-height: 150px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SubstituteIngredientAutocomplete = ({ value, onSelectIngredient }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');

  const fetchSubstituteIngredients = async (input) => {
    if (!input) return setSuggestions([]);

    try {
      const response = await axios.get('http://localhost:5001/api/substitute-ingredients', {
        params: { query: input },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching substitute ingredients:', error);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    fetchSubstituteIngredients(inputValue);
  };

  const handleSelect = (ingredient) => {
    onSelectIngredient(ingredient);
    setQuery(ingredient.IngredientName);
    setSuggestions([]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Input
        type="text"
        placeholder="Search for substitutes"
        value={query || value}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <Dropdown>
          {suggestions.map((item) => (
            <DropdownItem key={item.IngredientID} onClick={() => handleSelect(item)}>
              {item.IngredientName}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </div>
  );
};

export default SubstituteIngredientAutocomplete;
