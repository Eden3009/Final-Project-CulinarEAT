import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import SearchResultsPage from './SearchResultsPage';
import AddRecipePage from './AddRecipePage';
import ShoppingListPage from './ShoppingListPage';
import FavoritesPage from './FavoritesPage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import ChatbotPage from './ChatbotPage';
import RecipeDetailPage from './RecipeDetailPage';
import Navbar from './Navbar';

// Updated App component to include backend integration
function App() {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to track users fetched from the backend
  const [users, setUsers] = useState([]);

  // Fetch users from backend on mount
  useEffect(() => {
    fetch('http://localhost:5001/User')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />  {/* Pass login state to Navbar */}
        <Routes>
          {/* Common routes (both guest and registered users) */}
          <Route path="/" element={<HomePage users={users} />} />  {/* Passing users to HomePage */}
          <Route path="/recipe-detail" element={<RecipeDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />

          {/* Guest routes */}
          {!isLoggedIn && (
            <>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            </>
          )}

          {/* Registered user routes */}
          {isLoggedIn && (
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/add-recipe" element={<AddRecipePage />} />
              <Route path="/shopping-list" element={<ShoppingListPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
