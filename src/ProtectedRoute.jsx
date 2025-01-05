import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    // Redirect to the login page if the user is not logged in
    return <Navigate to="/login" />;
  }
  
// Render nothing while session is still being checked
if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }
  // Render the protected content if the user is logged in
  return children;
}

export default ProtectedRoute;
