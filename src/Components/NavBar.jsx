import React from 'react'
import { Link } from 'react-router-dom'

function NavBar({activeSection}) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to= "/">
        <img
          src="/logo.png"
          alt="Company Logo"
          className="company-logo"
        />
</Link>
        <ul className="nav-links">
          <li className={activeSection === 'apply' ? 'active' : ''}>
            <a href="#apply">Apply</a>
          </li>
          <li className={activeSection === 'contact' ? 'active' : ''}>
            <a href="#contact-us">Contact Us</a>
          </li>
        </ul>

      
      </div>
    </nav>
  )
}

export default NavBar