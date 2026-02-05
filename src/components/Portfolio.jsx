import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Portfolio.css'
import TiltedCard from './TiltedCard'

const Portfolio = ({ standalone = false, limit }) => {
  const portfolioRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const isTeaser = typeof limit === 'number' && limit > 0

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

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll('.portfolio-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-visible')
            }, index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const portfolioItems = [
    {
      title: 'Commercial Campaign',
      category: 'Video Production',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop'
    },
    {
      title: 'Wedding Photography',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'
    },
    {
      title: 'Corporate Video',
      category: 'Video Production',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop'
    },
    {
      title: 'Event Coverage',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&h=600&fit=crop'
    },
    {
      title: 'Product Showcase',
      category: 'Video Production',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'
    },
    {
      title: 'Portrait Session',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
    }
  ]

  const displayItems = isTeaser ? portfolioItems.slice(0, limit) : portfolioItems

  return (
    <section id="portfolio" className={`portfolio ${isTeaser ? 'portfolio-teaser' : ''}`} ref={portfolioRef}>
      {!standalone && !isTeaser && <div className="section-title-hero" aria-hidden="true">Portfolio</div>}
      <div className="portfolio-container">
        <div className="section-header">
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">
            Real moments captured.
          </p>
        </div>
        <div className="section-content">
        <div className="portfolio-grid">
          {displayItems.map((item, index) => (
            <TiltedCard
              key={index}
              className="portfolio-item"
              scaleOnHover={1.03}
              rotateAmplitude={10}
            >
              <div 
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="portfolio-image-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="portfolio-image"
                    loading="lazy"
                  />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <span className="portfolio-category">{item.category}</span>
                      <h3 className="portfolio-title">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>
        {isTeaser && (
          <div className="portfolio-teaser-cta">
            <Link to="/portfolio" className="portfolio-teaser-link">View portfolio</Link>
          </div>
        )}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
