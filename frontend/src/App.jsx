import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🌍 GlobalTalk</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#community">Community</a>

          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="badge">🌎 Connect Globally</span>

            <h1>
              Talk to people
              <br />
              <span>around the world.</span>
            </h1>

            <p>
              Meet people from different countries, discover new
              cultures and have meaningful conversations.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() => setShowLogin(true)}
              >
                Get Started
              </button>

              <button className="secondary-btn">
                Explore Community
              </button>
            </div>
          </div>
        </section>

        <section className="features" id="about">
          <h2>Everything you need</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon">🌍</div>
              <h3>Global Community</h3>
              <p>
                Connect with people from different countries and cultures.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">🔐</div>
              <h3>Secure Accounts</h3>
              <p>
                Secure authentication and account protection.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">💬</div>
              <h3>Real Conversations</h3>
              <p>
                Chat and communicate with people around the world.
              </p>
            </div>
          </div>
        </section>
      </main>

      {showLogin && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowLogin(false)}
            >
              ×
            </button>

            <h2>Welcome to GlobalTalk</h2>

            <p className="login-subtitle">
              Sign in to continue
            </p>

            <button
  className="google-btn"
  onClick={async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setShowLogin(false);
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  }}
>
  <span>G</span>
  Continue with Google
</button>
 <div className="divider">
              <span>OR</span>
            </div>

            <input
  type="email"
  placeholder="Email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
            <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/> 
            <button
  className="primary-btn login-submit"
  onClick={async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLogin(false);
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }}
>
  Sign In
</button>
          </div>
        </div>
      
      )}

      <footer>
        <p>© 2026 GlobalTalk. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
