import React from 'react';
import './Nav.css';

const Navbar = () => {
  return (
   <nav className="navbar">
   <div className="navbar-logo">
     <img src="/Logo/logo.png" alt="Logo" className="logo" />
     <span class="navbar-text">Weather Application</span>
   </div>
   
    </nav>
   
  );
};

export default Navbar;
