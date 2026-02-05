import { Link } from 'react-router-dom'
import './HomeIntro.css'

const HomeIntro = () => {
  return (
    <section className="home-intro">
      <div className="home-intro-inner">
        <h2 className="home-intro-title">Stories from the deep</h2>
        <p className="home-intro-text">
          We’re a video production and photography studio. Documentary and cinematic. High contrast. Moody. Real. We capture what others cannot see.
        </p>
        <Link to="/our-story" className="home-intro-link">Our story</Link>
      </div>
    </section>
  )
}

export default HomeIntro
