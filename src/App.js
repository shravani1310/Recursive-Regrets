import './App.css';
import HomePage from './Components/Pages/Home'
import CaseStudiesList from './Components/Pages/Casestudies';
import GenerateVisualization from './Components/Pages/CaseStudydetail';
import Dashboard from './Components/Pages/dashboard';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
         <Router>
         <nav className="navbar">
          <div className="logo">DataScience Interactive</div>
          <ul className="nav-links">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/case-studies">Case Studies</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies" element={<CaseStudiesList />} />
        <Route path="/case-studies/:id" element={<GenerateVisualization />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
