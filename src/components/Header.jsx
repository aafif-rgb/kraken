import { useState } from 'react'
import './Header.css'

const Header = ({ isScrolled, isInHero }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isInHero ? 'in-hero' : ''}`}>
      <div className="header-container">
        <div className={`logo ${isInHero ? 'hidden' : 'visible'}`} onClick={() => scrollToSection('hero')}>
          <img src="/Kraken.svg" alt="Kraken" className="logo-image" />
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#services" onClick={() => scrollToSection('services')}>Services</a>
          <a href="#portfolio" onClick={() => scrollToSection('portfolio')}>Portfolio</a>
          <a href="#about" onClick={() => scrollToSection('about')}>About</a>
          <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
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
