// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home'; // New Home Page
import Login from './components/Login';
import SoilAnalysis from './components/SoilAnalysis';
import DiseaseDetection from './components/DiseaseDetection';
import Footer from './components/Footer'; // New Footer
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-main">
        {/* Top Navigation Bar */}
        <nav className="nav-bar">
          <Link to="/" className="brand">🌱 Agri-Doctor</Link>
          
          {isAuthenticated && (
            <div className="nav-links-group">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/soil-analysis">Soil Lab</Link>
              <Link className="nav-link" to="/disease-detection">Dr. Leaf</Link>
              <button className="logout-btn" onClick={() => setIsAuthenticated(false)}>Logout</button>
            </div>
          )}
        </nav>

        {/* Main Content Area */}
        <div className="content-wrap">
          <Routes>
            {/* Login Logic */}
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} 
            />

            {/* Protected Routes */}
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/soil-analysis" element={isAuthenticated ? <SoilAnalysis /> : <Navigate to="/login" />} />
            <Route path="/disease-detection" element={isAuthenticated ? <DiseaseDetection /> : <Navigate to="/login" />} />
          </Routes>
        </div>

        {/* Permanent Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;