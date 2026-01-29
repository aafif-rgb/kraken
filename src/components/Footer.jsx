import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/Kraken.svg" alt="Kraken" className="footer-logo-image" />
            </div>
            <p className="footer-description">
              Professional video production and photography services
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#services" onClick={() => scrollToSection('services')}>Services</a></li>
              <li><a href="#portfolio" onClick={() => scrollToSection('portfolio')}>Portfolio</a></li>
              <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
              <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <ul className="footer-links">
              <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Vimeo</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Kraken. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
