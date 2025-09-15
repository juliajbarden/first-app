import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import Journal from './components/Journal';
import Medications from './components/Medications';
import Profile from './components/Profile';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="nav">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
            <path d="M12 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 2v2H9v2h2v2h2v-2h2v-2h-2v-2h-2z"/>
          </svg>
          Herra
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/calendar" className={`nav-link ${isActive('/calendar') ? 'active' : ''}`}>
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/journal" className={`nav-link ${isActive('/journal') ? 'active' : ''}`}>
              Journal
            </Link>
          </li>
          <li>
            <Link to="/medications" className={`nav-link ${isActive('/medications') ? 'active' : ''}`}>
              Medications
            </Link>
          </li>
          <li>
            <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  useEffect(() => {
    // Request notification permission on app start
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
