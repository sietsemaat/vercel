import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="google-logo">STSMT</span>
        </Link>
        <nav className="main-nav">
          <Link to="/" className="nav-link active">
            Blog
          </Link>
          <a href="#" className="nav-link">
            Publications
          </a>
          <a href="#" className="nav-link">
            People
          </a>
          <a href="#" className="nav-link">
            Teams
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
