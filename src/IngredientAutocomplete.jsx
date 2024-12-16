import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AutocompleteWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AutocompleteInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #5b9e5d;
    box-shadow: 0px 0px 8px rgba(92, 158, 93, 0.3);
    outline: none;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  z-index: 1000;
  width: 100%;
  max-height: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const IngredientAutocomplete = ({ value, onSelectIngredient }) => {
  const [query, setQuery] = useState(value || ''); // Initialize with the prop value
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/api/ingredients?query=${query}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching ingredient suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce API calls
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Update the input when the parent value changes
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  return (
    <AutocompleteWrapper>
      <AutocompleteInput
        type="text"
        placeholder="Type an ingredient..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((ingredient) => (
            <SuggestionItem
              key={ingredient.IngredientID}
              onClick={() => {
                onSelectIngredient(ingredient); // Pass selected ingredient to parent
                setQuery(ingredient.IngredientName); // Update input with selected ingredient
                setSuggestions([]); // Clear suggestions
              }}
            >
              {ingredient.IngredientName}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </AutocompleteWrapper>
  );
};

export default IngredientAutocomplete;
