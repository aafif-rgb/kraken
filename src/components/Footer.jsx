import { Link } from 'react-router-dom'
import { InstagramIcon, FacebookIcon, TikTokIcon } from './icons'
import './Footer.css'

// Update these URLs to your actual social media profile links
const socialLinks = [
  { label: 'Instagram', url: 'https://instagram.com', ariaLabel: 'Follow us on Instagram', Icon: InstagramIcon },
  { label: 'Facebook', url: 'https://facebook.com', ariaLabel: 'Follow us on Facebook', Icon: FacebookIcon },
  { label: 'TikTok', url: 'https://tiktok.com', ariaLabel: 'Follow us on TikTok', Icon: TikTokIcon },
]

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
            <ul className="footer-social-list">
              {socialLinks.map((item) => {
                const Icon = item.Icon
                return (
                  <li key={item.label}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      className="footer-social-link"
                    >
                      <Icon className="footer-social-icon" />
                    </a>
                  </li>
                )
              })}
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
