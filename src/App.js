import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import SearchResultsPage from './SearchResultsPage';
import AddRecipePage from './AddRecipePage';
import ShoppingListPage from './ShoppingListPage';
import FavoritesPage from './FavoritesPage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';  // Importing your existing Registration Page
import ChatbotPage from './ChatbotPage';
import RecipeDetailPage from './RecipeDetailPage';
import Navbar from './Navbar';  // Navbar component

function App() {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} />  {/* Pass login state to Navbar */}
        <Routes>
          {/* Common routes (both guest and registered users) */}
          <Route path="/" element={<HomePage />} />
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
