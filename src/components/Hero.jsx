import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [showContent, setShowContent] = useState(false)

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
    
    if (video) {
      // Set video properties
      video.muted = true
      video.loop = true
      video.playsInline = true
      
      // Try to play the video
      const playPromise = video.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing, show content after 2 seconds
            timer = setTimeout(() => {
              setShowContent(true)
            }, 2000)
          })
          .catch(err => {
            console.log('Video autoplay prevented:', err)
            // Show content anyway after 2 seconds even if video doesn't play
            timer = setTimeout(() => {
              setShowContent(true)
            }, 2000)
          })
      } else {
        // Fallback: show content after 2 seconds
        timer = setTimeout(() => {
          setShowContent(true)
        }, 2000)
      }
    } else {
      // No video element, show content after 2 seconds
      timer = setTimeout(() => {
        setShowContent(true)
      }, 2000)
    }
    
    // Cleanup function
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
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
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>
      <div className={`hero-content ${showContent ? 'visible' : ''}`}>
        <div className="hero-logo-wrapper">
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
      <div className={`hero-scroll-indicator ${showContent ? 'visible' : ''}`}>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

export default Hero
