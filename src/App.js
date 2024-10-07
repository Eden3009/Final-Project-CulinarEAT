import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';  // Import the HomePage component
import RegistrationPage from './RegistrationPage';  // Assuming you have this
import Navbar from './Navbar';  // Import the Navbar component

function App() {
  return (
    <Router>
      <div>
        <Navbar />  {/* Navbar will always be visible at the top */}
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Home Page route */}
          <Route path="/registrationpage" element={<RegistrationPage />} />  {/* Registration Page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
