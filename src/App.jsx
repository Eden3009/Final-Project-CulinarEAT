
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
import Navbar from './Navbar';
import Footer from './Footer';
import CategoryPage from './CategoryPage'; // Default export
import PrivacyPolicyPage from './PrivacyPolicyPage';
import ResetPasswordPage from './ResetPasswordPage'; // Import ResetPasswordPage
import axios from 'axios';
import RecipeViewPage from './RecipeViewPage'; // Import the new component
import { UserProvider } from './UserContext';
import ProtectedRoute from './ProtectedRoute';
import TermsOfService from './TermsOfService'; // Import the TermsOfService component
import LandingPage from './LandingPage'; // Import LandingPage component

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

function ErrorBoundary({ children }) {

  return <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>;
}

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
        // User is not logged in, but this should not block recipe fetching
        console.warn('No active session');
        setIsLoggedIn(false);
      });
  }, []);

  return (

    <UserProvider>
      {/* Wrap the app with UserProvider */}
      <div style={appStyles.app}>
        <Router>
          {/* Navbar */}
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

          {/* Routes */}
          <ErrorBoundary>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} /> {/* Add LandingPage */}
              
              {/* Public Routes */}
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/recipe-view/:RecipeID" element={<RecipeViewPage />} />
              <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfService />} />

              {/* Protected Routes */}
              <Route
                path="/add-recipe"
                element={
                  <ProtectedRoute>
                    <AddRecipePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chatbot"
                element={
                  <ProtectedRoute>
                    <ChatbotPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shopping-list"
                element={
                  <ProtectedRoute>
                    <ShoppingListPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ErrorBoundary>

          {/* Footer */}
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
