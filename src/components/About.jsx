import { useEffect, useRef } from 'react'
import './About.css'
import { CameraIcon } from './icons'
import { useCounter } from '../hooks/useCounter'

const About = ({ standalone = false }) => {
  const aboutRef = useRef(null)
  const [stat1, stat1Ref] = useCounter('500+')
  const [stat2, stat2Ref] = useCounter('10+')
  const [stat3, stat3Ref] = useCounter('100%')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const statItems = document.querySelectorAll('.stat-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-visible')
            }, 200)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    statItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about" ref={aboutRef}>
      {!standalone && <div className="section-title-hero" aria-hidden="true">About</div>}
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">{standalone ? 'The studio' : 'About'}</h2>
        </div>
        <div className="section-content about-content">
          <div className="about-text">
            <p className="about-description">
              We're a KSA-based team. A silent force—unseen, powerful, intentional.
            </p>
            <p className="about-description">
              We capture what others cannot see. Documentary and cinematic. 
              High contrast. Moody. Real.
            </p>
            <div className="about-stats">
              <div className="stat-item" ref={stat1Ref}>
                <div className="stat-number">{stat1}</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item" ref={stat2Ref}>
                <div className="stat-number">{stat2}</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item" ref={stat3Ref}>
                <div className="stat-number">{stat3}</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-image-placeholder">
              <div className="placeholder-content">
                <CameraIcon className="placeholder-icon" />
                <p>Team Photo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
