import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLayout } from '../context/LayoutContext'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isScrolled, isInHero } = useLayout()
  const navigate = useNavigate()

  const goTo = (path) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isInHero ? 'in-hero' : ''}`}>
      <div className="header-container">
        <div className={`logo ${isInHero ? 'hidden' : 'visible'}`} onClick={() => goTo('/')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && goTo('/')}>
          <img src="/Kraken.svg" alt="Kraken" className="logo-image" />
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
          <Link to="/our-story" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
        </button>
      </div>
    </header>
  )
}

export default Header
