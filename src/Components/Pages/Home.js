import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css'; // Add your CSS file for styling

const HomePage = () => {
  

  return (
    <div className="homepage-container">
         <header className="hero-section">
          <h1>Welcome to DataScience Interactive</h1>
          <p>Learn data science through real-world case studies, interactive workflows, and AI-powered guidance.</p>
          <div className="hero-buttons">
            <Link to="/case-studies" className="button primary">Explore Case Studies</Link>
            <Link to="/dashboard" className="button secondary">Go to Dashboard</Link>
          </div>
        </header>
      <section className="features-section">
        <h2>Why Learn With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Interactive Workflows</h3>
            <p>Solve step-by-step challenges and mimic real-world data science workflows.</p>
          </div>
          <div className="feature-card">
            <h3>AI-Powered Guidance</h3>
            <p>Get personalized hints, explanations, and feedback powered by AI.</p>
          </div>
          <div className="feature-card">
            <h3>Gamified Learning</h3>
            <p>Earn badges, climb the leaderboard, and make learning fun!</p>
          </div>
          <div className="feature-card">
            <h3>Real-World Case Studies</h3>
            <p>Work on industry-inspired projects in healthcare, finance, e-commerce, and more.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2025 DataScience Interactive. All Rights Reserved.</p>
        <ul className="footer-links">
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default HomePage;
