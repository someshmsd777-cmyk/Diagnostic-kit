import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login & SignUp

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Only for Sign Up

  const navigate = useNavigate();

  // --- HANDLE SUBMIT ---
  const handleSubmit = () => {
    if (isLoginMode) {
      // --- LOGIN LOGIC ---
      const storedUser = localStorage.getItem("agriUser");
      const storedPass = localStorage.getItem("agriPass");

      if (username === storedUser && password === storedPass) {
        setIsAuthenticated(true);
        navigate('/');
      } else if (username === "admin" && password === "admin") {
        // Default admin access
        setIsAuthenticated(true);
        navigate('/');
      } else {
        alert("❌ Invalid Username or Password!");
      }

    } else {
      // --- SIGN UP LOGIC ---
      if (username && password && email) {
        localStorage.setItem("agriUser", username);
        localStorage.setItem("agriPass", password);
        alert("✅ Account Created Successfully! Please Login.");
        setIsLoginMode(true); // Switch to login screen
      } else {
        alert("Please fill all fields!");
      }
    }
  };

  return (
    <div className="container">
      <h2>{isLoginMode ? "🌱 Farmer Login" : "📝 New Farmer Registration"}</h2>
      <p>{isLoginMode ? "Welcome back to Agri-Doctor" : "Create an account to access AI tools"}</p>

      {/* Common Fields */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Email Field - Only for Sign Up */}
      {!isLoginMode && (
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Action Button */}
      <button onClick={handleSubmit}>
        {isLoginMode ? "Login" : "Sign Up"}
      </button>

      {/* Toggle Link */}
      <p style={{ marginTop: '15px', fontSize: '14px' }}>
        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
        <span
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="toggle-link"
        >
          {isLoginMode ? "Sign Up" : "Login"}
        </span>
      </p>

    </div>
  );
}

export default Login;