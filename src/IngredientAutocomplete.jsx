import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const IngredientAutocomplete = ({ value, onSelectIngredient, onAddNewIngredient }) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientNotFound, setIsIngredientNotFound] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
        if (query.trim().length === 0) {
            setSuggestions([]);
            setIsIngredientNotFound(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5001/api/ingredients?query=${query}`);
            const suggestionsList = response.data || [];

            // Check if there is an exact match
            const exactMatch = suggestionsList.some(
                (item) => item.IngredientName.toLowerCase() === query.toLowerCase().trim()
            );

            setSuggestions(suggestionsList);
            setIsIngredientNotFound(!exactMatch); // If no exact match, show "Item not found"
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            setSuggestions([]);
            setIsIngredientNotFound(true);
        } finally {
            setIsLoading(false);
        }
    };

    fetchSuggestions();
}, [query]);

  const handleSelect = (selectedIngredient) => {
    onSelectIngredient(selectedIngredient);
    setQuery(selectedIngredient.IngredientName); // Set input value to selected name
    setSuggestions([]); // Clear the list to close it
    setIsIngredientNotFound(false); // Remove "Item not found" message
  };

  const handleAddNewIngredient = async () => {
    if (!query.trim()) return;
  
    try {
      const response = await onAddNewIngredient(query);  // Await the returned response
      if (response?.status === 201) {
        setIsIngredientNotFound(false);
        setSuggestions([]);  // Clear the list
      }
    } catch (error) {
      console.error('Error adding new ingredient:', error);
      alert('Failed to add new ingredient. Please try again.');
    }
  };
  

  return (
    <AutocompleteWrapper>
      <AutocompleteInput
        type="text"
        placeholder="Search for ingredient"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Ingredient search input"
      />
      {isLoading && <LoadingMessage>Loading...</LoadingMessage>}
      {isIngredientNotFound && (
        <NoMatchItem onClick={handleAddNewIngredient}>
          Item not found, to add it — <span>click on me!</span>
        </NoMatchItem>
      )}
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem key={suggestion.IngredientID} onClick={() => handleSelect(suggestion)}>
              {suggestion.IngredientName}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </AutocompleteWrapper>
  );
};

// Styled Components
const AutocompleteWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AutocompleteInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  background-color: #fefefe;
  font-family: 'Raleway', sans-serif;
  box-sizing: border-box;
  &:focus {
    border-color: #5b9e5d;
    outline: none;
  }
`;

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ddd;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NoMatchItem = styled.div`
  margin-top: 5px;
  color: #e74c3c;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
`;

const LoadingMessage = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;

export default IngredientAutocomplete;
