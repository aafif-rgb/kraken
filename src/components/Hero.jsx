import { useEffect, useMemo, useRef, useState } from 'react'
import './Hero.css'

const DROPLET_COUNT = 22

const Hero = ({ isInHero }) => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [showContent, setShowContent] = useState(false)

  const droplets = useMemo(() => {
    return Array.from({ length: DROPLET_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 3 + Math.random() * 5,
      opacity: 0.35 + Math.random() * 0.4,
    }))
  }, [])

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

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    let timer

    const tryPlay = () => {
      if (!video) return
      video.muted = true
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')
      video.playsInline = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            timer = setTimeout(() => setShowContent(true), 2000)
          })
          .catch(() => {})
      }
    }

    const onUserInteraction = () => {
      tryPlay()
      document.removeEventListener('touchstart', onUserInteraction)
      document.removeEventListener('touchend', onUserInteraction)
      document.removeEventListener('click', onUserInteraction)
    }

    if (video) {
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')

      tryPlay()

      video.addEventListener('loadeddata', tryPlay, { once: true })
      video.addEventListener('canplay', tryPlay, { once: true })

      document.addEventListener('touchstart', onUserInteraction, { once: true, passive: true })
      document.addEventListener('touchend', onUserInteraction, { once: true, passive: true })
      document.addEventListener('click', onUserInteraction, { once: true })
    }

    timer = setTimeout(() => setShowContent(true), 2000)

    return () => {
      clearTimeout(timer)
      if (video) {
        video.removeEventListener('loadeddata', tryPlay)
        video.removeEventListener('canplay', tryPlay)
      }
      document.removeEventListener('touchstart', onUserInteraction)
      document.removeEventListener('touchend', onUserInteraction)
      document.removeEventListener('click', onUserInteraction)
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-background">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/Kraken.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
        <div className="hero-water-droplets" aria-hidden="true">
          {droplets.map((d) => (
            <span
              key={d.id}
              className="hero-droplet"
              style={{
                left: `${d.left}%`,
                top: `${d.top}%`,
                width: `${d.size}px`,
                height: `${d.size}px`,
                opacity: d.opacity,
              }}
            />
          ))}
        </div>
      </div>
      <div className={`hero-content ${showContent ? 'visible' : ''}`}>
        <div className={`hero-logo-wrapper ${showContent && isInHero ? 'visible' : 'hidden'}`}>
          <img src="/Kraken2.svg" alt="Kraken" className="hero-logo" />
        </div>
        <h1 className="hero-title">
          <span className="hero-line">STORIES</span>
          <span className="hero-line">FROM THE DEEP</span>
        </h1>
        <p className="hero-subtitle">
          Real People. Real Stories.
        </p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => scrollToSection('portfolio')}
          >
            View Work
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
