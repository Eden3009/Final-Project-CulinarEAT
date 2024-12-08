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
import Footer from './Footer';
import BreakfastPage from './BreakfastPage';
import LunchPage from './LunchPage';
import DinnerPage from './DinnerPage';
import PastaPage from './PastaPage';
import RicePage from './RicePage';
import SeafoodPage from './SeafoodPage';
import SoupsPage from './SoupsPage';
import DessertsPage from './DessertsPage';
import VegetarianPage from './VegetarianPage';
import VeganPage from './VeganPage';
import DrinksPage from './DrinksPage';
import QuickMealsPage from './QuickMealsPage';
import ChickenPage from './ChickenPage';
import BeefPage from './BeefPage';
import AsianPage from './AsianPage';
import HolidaysPage from './HolidaysPage';
import axios from 'axios';

const appStyles = {
  app: {
    textAlign: 'center',
  },
  appHeader: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  appLink: {
    color: '#61dafb',
  },
  appLogo: {
    height: '40vmin',
    pointerEvents: 'none',
    animation: 'App-logo-spin infinite 20s linear',
  },
};

const keyframeStyles = `
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Inject keyframes into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerHTML = keyframeStyles;
document.head.appendChild(styleSheet);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for session status on initial load
  useEffect(() => {
    axios
      .get('http://localhost:5001/session', { withCredentials: true })
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
      <div style={appStyles.app}>
        {/* Navbar */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/breakfast" element={<BreakfastPage />} />
          <Route path="/lunch" element={<LunchPage />} />
          <Route path="/dinner" element={<DinnerPage />} />
          <Route path="/pasta" element={<PastaPage />} />
          <Route path="/rice" element={<RicePage />} />
          <Route path="/seafood" element={<SeafoodPage />} />
          <Route path="/soups" element={<SoupsPage />} />
          <Route path="/desserts" element={<DessertsPage />} />
          <Route path="/vegetarian" element={<VegetarianPage />} />
          <Route path="/vegan" element={<VeganPage />} />
          <Route path="/drinks" element={<DrinksPage />} />
          <Route path="/quick-meals" element={<QuickMealsPage />} />
          <Route path="/chicken" element={<ChickenPage />} />
          <Route path="/beef" element={<BeefPage />} />
          <Route path="/asian" element={<AsianPage />} />
          <Route path="/holidays" element={<HolidaysPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route
            path="/shopping-list"
            element={
              isLoggedIn ? (
                <ShoppingListPage />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/favorites"
            element={
              isLoggedIn ? (
                <FavoritesPage />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <ProfilePage />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/chatbot"
            element={
              isLoggedIn ? (
                <ChatbotPage />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route path="/recipe-detail" element={<RecipeDetailPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
