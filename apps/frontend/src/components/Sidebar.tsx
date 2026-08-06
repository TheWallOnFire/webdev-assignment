import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar glass-panel">
      <div className="brand">
        <div className="logo-icon"></div>
        <h2>G-Scores</h2>
      </div>
      
      <nav className="nav-menu">
        <p className="nav-label">MAIN</p>
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🔍</span>
          Score Checker
        </NavLink>
        
        <p className="nav-label">REPORTS</p>
        <NavLink to="/statistics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">📊</span>
          Statistics
        </NavLink>
        <NavLink to="/top-group-a" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🏆</span>
          Top 10 Group A
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
