import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import KidsSection from './components/KidsSection';
import AdultsSection from './components/AdultsSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  // Set userType to 'kid' for this example
  
  const [userType] = useState('adult');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage userType={userType} />} />
        <Route path="/kid" element={<KidsSection userType={userType} />} />
        <Route 
          path="/adult" 
          element={userType === 'adult' ? <AdultsSection /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;