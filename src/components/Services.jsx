import { useEffect, useRef, useState } from 'react'
import './Services.css'
import TiltedCard from './TiltedCard'
import { 
  VideoIcon, 
  CameraIcon, 
  EditIcon, 
  DroneIcon, 
  BroadcastIcon, 
  TargetIcon 
} from './icons'

const Services = () => {
  const servicesRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

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
      Icon: VideoIcon
    },
    {
      title: 'Photography',
      description: 'Documentary and editorial. Real moments captured.',
      Icon: CameraIcon
    },
    {
      title: 'Post-Production',
      description: 'Editing, color grading, visual effects.',
      Icon: EditIcon
    },
    {
      title: 'Drone Services',
      description: 'Aerial perspectives. Unique angles.',
      Icon: DroneIcon
    },
    {
      title: 'Live Streaming',
      description: 'Professional production for events and broadcasts.',
      Icon: BroadcastIcon
    },
    {
      title: 'Brand Content',
      description: 'Strategic storytelling that resonates.',
      Icon: TargetIcon
    }
  ]

  return (
    <section id="services" className="services" ref={servicesRef}>
      <div className="services-container">
        <div className="section-header">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            We create impact.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.Icon
            return (
              <TiltedCard
                key={index}
                className="service-card"
                scaleOnHover={1.02}
                rotateAmplitude={8}
              >
                <div 
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="service-icon">
                    <IconComponent className="service-icon-svg" />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </TiltedCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
