import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaBook, FaTasks, FaUserGraduate, FaTrophy } from 'react-icons/fa';
import '../CSS/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/progress"><FaChartLine /> Progress Overview</Link></li>
            <li><Link to="/case-studies"><FaBook /> Case Studies</Link></li>
            <li><Link to="/tasks"><FaTasks /> My Tasks</Link></li>
            <li><Link to="/achievements"><FaTrophy /> Achievements</Link></li>
            <li><Link to="/profile"><FaUserGraduate /> Profile</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <section className="progress-overview">
          <h2>Progress Overview</h2>
          <div className="progress-cards">
            <div className="progress-card">
              <h3>Completed Case Studies</h3>
              <p>4/10</p>
            </div>
            <div className="progress-card">
              <h3>Current Streak</h3>
              <p>5 Days</p>
            </div>
            <div className="progress-card">
              <h3>Badges Earned</h3>
              <p>3</p>
            </div>
          </div>
        </section>

        <section className="upcoming-tasks">
          <h2>Upcoming Tasks</h2>
          <ul>
            <li>Complete Feature Engineering in Healthcare - Due: Jan 30</li>
            <li>Finish EDA Basics in E-Commerce - Due: Feb 2</li>
          </ul>
        </section>

        <section className="achievements">
          <h2>Achievements</h2>
          <div className="badge-list">
            <div className="badge">Beginner Analyst</div>
            <div className="badge">Feature Engineer</div>
            <div className="badge">Model Builder</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
