import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AddRecipePage from './AddRecipePage';
import ShoppingListPage from './ShoppingListPage';
import FavoritesPage from './FavoritesPage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import ChatbotPage from './ChatbotPage';
import RecipeDetailPage from './RecipeDetailPage';
import Navbar from './Navbar';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for session status on initial load
  useEffect(() => {
    axios.get('http://localhost:5001/session', { withCredentials: true })
      .then((response) => {
        if (response.data.message === 'Session valid') {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Temporarily disable login check for AddRecipePage */}
          <Route path="/add-recipe" element={<AddRecipePage />} />

          <Route path="/shopping-list" element={isLoggedIn ? <ShoppingListPage /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/favorites" element={isLoggedIn ? <FavoritesPage /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/chatbot" element={isLoggedIn ? <ChatbotPage /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/recipe-detail" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
