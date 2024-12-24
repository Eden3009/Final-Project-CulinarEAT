import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Input aligned with the other input fields in AddRecipePage
const Input = styled.input`
  width: 100%;
  height: 48px; /* Matches height of other fields */
  padding: 12px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  font-family: 'Raleway', sans-serif;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #5b9e5d;
    box-shadow: 0px 0px 8px rgba(92, 158, 93, 0.3);
    outline: none;
  }
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
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const AutocompleteWrapper = styled.div`
  width: 100%;
  height: 48px; /* Ensure consistent height */
  position: relative; /* For dropdown positioning */
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
    <AutocompleteWrapper>
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
    </AutocompleteWrapper>
  );
};

export default SubstituteIngredientAutocomplete;
