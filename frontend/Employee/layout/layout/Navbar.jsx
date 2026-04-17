import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom shadow-sm">
      <div className="container-fluid px-4">
        <Link className="navbar-brand brand-custom" to="/">
          <i className="fas fa-building me-2"></i>
          <span className="brand-text">Employee Hub</span>
        </Link>
        
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link nav-link-custom ${isActive('/') ? 'active' : ''}`} 
                to="/"
                onClick={() => setIsCollapsed(true)}
              >
                <i className="fas fa-home me-2"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link nav-link-custom ${isActive('/adduser') ? 'active' : ''}`} 
                to="/adduser"
                onClick={() => setIsCollapsed(true)}
              >
                <i className="fas fa-user-plus me-2"></i>
                Add Employee
              </Link>
            </li>
          </ul>
          
          <div className="navbar-nav">
            <div className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle nav-link-custom" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <i className="fas fa-user-circle me-2"></i>
                Admin
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Settings</a></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-chart-bar me-2"></i>Reports</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt me-2"></i>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
