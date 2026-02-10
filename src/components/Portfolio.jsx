import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Portfolio.css'
import TiltedCard from './TiltedCard'

const portfolioItems = [
  {
    title: 'Commercial Campaign',
    category: 'Video Production',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=700&fit=crop',
    ],
  },
  {
    title: 'Wedding Photography',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522673607200-1645811e6d4a?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529636798458-92182a662888?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'Corporate Video',
    category: 'Video Production',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'Event Coverage',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'Product Showcase',
    category: 'Video Production',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556742111-a301358d0dbb?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop',
    ],
  },
  {
    title: 'Portrait Session',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&h=500&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop',
    ],
  },
]

const Portfolio = ({ standalone = false, limit }) => {
  const portfolioRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)
  const isTeaser = typeof limit === 'number' && limit > 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up')
        })
      },
      { threshold: 0.1 }
    )
    if (portfolioRef.current) observer.observe(portfolioRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll('.portfolio-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('animate-visible'), index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [selectedItem])

  const displayItems = isTeaser ? portfolioItems.slice(0, limit) : portfolioItems

  const masonryVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  }

  return (
    <section id="portfolio" className={`portfolio ${isTeaser ? 'portfolio-teaser' : ''}`} ref={portfolioRef}>
      {!standalone && !isTeaser && <div className="section-title-hero" aria-hidden="true">Portfolio</div>}
      <div className="portfolio-container">
        <div className="section-header">
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">Real moments captured.</p>
        </div>
        <div className="section-content">
          <div className="portfolio-grid">
            {displayItems.map((item, index) => (
              <TiltedCard key={index} className="portfolio-item" scaleOnHover={1.03} rotateAmplitude={10}>
                <div
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedItem(item)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                >
                  <div className="portfolio-image-wrapper">
                    <img src={item.image} alt={item.title} className="portfolio-image" loading="lazy" />
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

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="portfolio-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="portfolio-detail-panel"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="portfolio-detail-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="portfolio-detail-header">
                <span className="portfolio-detail-category">{selectedItem.category}</span>
                <h2 className="portfolio-detail-title">{selectedItem.title}</h2>
              </div>
              <div className="portfolio-detail-masonry">
                {selectedItem.gallery.map((src, i) => (
                  <motion.div
                    key={i}
                    className={`portfolio-detail-tile portfolio-detail-tile--${['wide', 'tall', 'square'][i % 3]}`}
                    variants={masonryVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    layout
                    role="button"
                    tabIndex={0}
                    onClick={() => setLightboxImage(src)}
                    onKeyDown={(e) => e.key === 'Enter' && setLightboxImage(src)}
                  >
                    <img src={src} alt={`${selectedItem.title} ${i + 1}`} loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="portfolio-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              className="portfolio-lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close image"
            >
              ×
            </button>
            <motion.div
              className="portfolio-lightbox-content"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightboxImage} alt="Enlarged view" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Portfolio
