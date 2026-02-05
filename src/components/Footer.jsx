import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

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
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/our-story">Our Story</Link></li>
              <li><Link to="/contact">Contact</Link></li>
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
