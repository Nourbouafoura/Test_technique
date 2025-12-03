import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
         Immobilier App
        </Link>
        
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Liste
          </Link>
          <Link 
            to="/property/new" 
            className={`nav-link ${location.pathname === '/property/new' ? 'active' : ''}`}
          >
            + Ajouter
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;