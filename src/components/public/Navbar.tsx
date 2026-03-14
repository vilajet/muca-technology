import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="#hero" className="navbar-logo">
          <span className="logo-icon">M</span>
          Muca Technology
        </a>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          <li><a href="#sherbimet" onClick={() => setOpen(false)}>Shërbimet</a></li>
          <li><a href="#rreth-nesh" onClick={() => setOpen(false)}>Rreth Nesh</a></li>
          <li><a href="#kontakt" onClick={() => setOpen(false)}>Kontakt</a></li>
        </ul>
      </div>
    </nav>
  )
}
