import { useEffect, useRef } from 'react'
import './KrakenStorySection.css'

const KrakenStorySection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up')
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="kraken-story" ref={sectionRef} aria-labelledby="kraken-heading">
      <div className="kraken-story-bg" aria-hidden="true">
        <div className="kraken-story-gradient" />
        <div className="kraken-story-depth" />
        <div className="kraken-story-tentacles" aria-hidden="true" />
      </div>

      <div className="kraken-story-container">
        <h2 id="kraken-heading" className="kraken-story-title">
          From the deep
        </h2>
        <p className="kraken-story-lead">
          The Kraken lives in the dark. Unseen until it chooses to rise. A legendary force—patient, powerful, impossible to ignore.
        </p>
        <p className="kraken-story-body">
          Based in the Kingdom of Saudi Arabia, we took the name because we believe the best work comes from that same place: beneath the surface. Not the quick, shallow take. The story that lurks in the depths—raw, cinematic, real. We dive for it. We bring it up. And when it hits the light, it hits hard.
        </p>
        <blockquote className="kraken-story-quote">
          <span className="kraken-story-quote-line">Stories from the deep.</span>
          <span className="kraken-story-quote-sub">— Est. 2023</span>
        </blockquote>
      </div>

      <div className="kraken-story-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="kraken-wave">
          <path
            d="M0 30 Q300 0 600 30 T1200 30 V60 H0 Z"
            fill="url(#kraken-wave-fill)"
          />
          <path
            d="M0 40 Q250 10 500 40 T1000 40 T1200 40 V60 H0 Z"
            fill="url(#kraken-wave-fill-2)"
          />
          <defs>
            <linearGradient id="kraken-wave-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#111" />
              <stop offset="100%" stopColor="#0a0e14" />
            </linearGradient>
            <linearGradient id="kraken-wave-fill-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a0e14" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}

export default KrakenStorySection
