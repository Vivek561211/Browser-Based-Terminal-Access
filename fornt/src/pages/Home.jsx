import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-container">
          <h1>TerminalAccess</h1>
          <span className="beta-tag">BETA</span>
        </div>
        <h2>Browser-Based Terminal Solution</h2>
        <p className="subtitle">Secure, collaborative terminal access from anywhere</p>
      </header>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Access</h3>
          <p>TLS encrypted connections with JWT authentication for all sessions</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌐</div>
          <h3>Browser-Based</h3>
          <p>No installations needed - access terminals directly from your browser</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Role-Based Control</h3>
          <p>Different access levels for users and administrators</p>
        </div>
      </section>

      <section className="home-actions">
        <div className="action-container">
          <button className="login-btn user-btn" onClick={() => navigate('/login?role=user')}>
            Login as User
          </button>
          <p className="action-description">Access your terminal environment with user privileges</p>
        </div>
        <div className="action-container">
          <button className="login-btn admin-btn" onClick={() => navigate('/login?role=admin')}>
            Login as Admin
          </button>
          <p className="action-description">Manage users, sessions, and system settings</p>
        </div>
      </section>

      <section className="tech-section">
        <h3>Powered By</h3>
        <div className="tech-stack">
          <span>React</span>
          <span>xterm.js</span>
          <span>Flask</span>
          <span>Docker</span>
          <span>PostgreSQL</span>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <p>© 2025 TerminalAccess Inc. All rights reserved.</p>
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
        <p className="team-credits">
          Project by: Vivek Borade, Harshal Giri, Tejas Gophane, Ujjwal Nimbhore, Vaibhav Shinde, Sanket Narote
        </p>
      </footer>
    </div>
  );
};

export default Home;