import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Services.css'
import { 
  VideoIcon, 
  CameraIcon, 
  EditIcon, 
  DroneIcon, 
  BroadcastIcon, 
  TargetIcon 
} from './icons'

const Services = ({ standalone = false, limit }) => {
  const servicesRef = useRef(null)
  const videoRefs = useRef([])
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const isTeaser = typeof limit === 'number' && limit > 0

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === hoveredIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [hoveredIndex])

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

    if (servicesRef.current) {
      observer.observe(servicesRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cards = document.querySelectorAll('.service-card')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-visible')
            }, index * 150)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      title: 'Video Production',
      description: 'Cinematic storytelling. From concept to final cut.',
      Icon: VideoIcon,
      videoSrc: '/videos/hero-background.mp4',
      poster: null
    },
    {
      title: 'Photography',
      description: 'Documentary and editorial. Real moments captured.',
      Icon: CameraIcon,
      videoSrc: '/Kraken.mp4',
      poster: null
    },
    {
      title: 'Post-Production',
      description: 'Editing, color grading, visual effects.',
      Icon: EditIcon,
      videoSrc: '/videos/Post-Production.mp4',
      poster: null
    },
    {
      title: 'Drone Services',
      description: 'Aerial perspectives. Unique angles.',
      Icon: DroneIcon,
      videoSrc: '/videos/Drone.mp4',
      poster: null
    },
    {
      title: 'Live Streaming',
      description: 'Professional production for events and broadcasts.',
      Icon: BroadcastIcon,
      videoSrc: '/videos/Live-Stream.mp4',
      poster: null
    },
    {
      title: 'Brand Content',
      description: 'Strategic storytelling that resonates.',
      Icon: TargetIcon,
      videoSrc: '/videos/Product-Showcase.mp4',
      poster: null
    }
  ]

  const displayServices = isTeaser ? services.slice(0, limit) : services

  return (
    <section id="services" className={`services ${isTeaser ? 'services-teaser' : ''}`} ref={servicesRef}>
      {!standalone && !isTeaser && <div className="section-title-hero" aria-hidden="true">Services</div>}
      <div className="services-container">
        <div className="section-header">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            We create impact.
          </p>
        </div>
        <div className="section-content">
        <div className="services-grid">
          {displayServices.map((service, index) => {
            const IconComponent = service.Icon
            return (
              <div
                key={index}
                className="service-card-wrapper"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="service-card">
                  {service.videoSrc && (
                    <div className="service-card-media" aria-hidden="true">
                      <video
                        ref={(el) => { videoRefs.current[index] = el }}
                        src={service.videoSrc}
                        poster={service.poster || undefined}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  )}
                  <div className="service-card-content">
                    <div className="service-icon">
                      <IconComponent className="service-icon-svg" />
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {isTeaser && (
          <div className="services-teaser-cta">
            <Link to="/services" className="services-teaser-link">View all services</Link>
          </div>
        )}
        </div>
      </div>
    </section>
  )
}

export default Services
