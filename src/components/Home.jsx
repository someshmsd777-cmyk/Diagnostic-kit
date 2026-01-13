import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Smart Farming 🚜</h1>
        <p>Detect crop diseases and analyze soil health instantly using AI.</p>
        <Link to="/soil-analysis" className="cta-button">Get Started</Link>
      </section>

      {/* Features Section (Only 2 Cards now) */}
      <section className="features">

        {/* Card 1: Soil */}
        <div className="feature-card">
          <div className="icon">🌍</div>
          <h3>Soil Analysis</h3>
          <p>Enter your soil nutrients (NPK) and get the best crop recommendations.</p>
          <Link to="/soil-analysis">Go to Lab &rarr;</Link>
        </div>

        {/* Card 2: Disease */}
        <div className="feature-card">
          <div className="icon">🍃</div>
          <h3>Disease Detection</h3>
          <p>Upload a photo of your leaf and get instant cure suggestions.</p>
          <Link to="/disease-detection">Scan Now &rarr;</Link>
        </div>

      </section>
    </div>
  );
}

export default Home;