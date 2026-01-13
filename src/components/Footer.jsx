// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🌱 Agri-Doctor</h3>
          <p>Empowering farmers with AI & Soil Intelligence.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/soil-analysis">Soil Lab</a></li>
            <li><a href="/disease-detection">Dr. Leaf</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📍 Salem, Tamil Nadu</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 help@agri-doctor.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Agri-Doctor Tech. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;