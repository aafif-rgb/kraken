import { Link } from 'react-router-dom'
import './PageCTA.css'

const PageCTA = ({ title, description, buttonText = 'Get in touch', buttonLink = '/contact' }) => {
  return (
    <section className="page-cta">
      <div className="page-cta-inner">
        <h2 className="page-cta-title">{title}</h2>
        {description && <p className="page-cta-description">{description}</p>}
        <Link to={buttonLink} className="page-cta-btn">
          {buttonText}
        </Link>
      </div>
    </section>
  )
}

export default PageCTA
