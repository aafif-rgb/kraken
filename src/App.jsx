import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInHero, setIsInHero] = useState(true)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Check if we're in the hero section
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + window.innerHeight / 2
        setIsInHero(scrollPosition < heroBottom)
      }
      
      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = (scrolled / windowHeight) * 100
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Section-by-section scroll snapping
  useEffect(() => {
    const sections = document.querySelectorAll('section, footer.footer')
    let wheelTimeout = null
    let wheelDelta = 0
    const scrollDelay = 150
    const minWheelDelta = 30

    const findCurrentSection = () => {
      const scrollY = window.scrollY
      const viewportCenter = scrollY + window.innerHeight / 2
      
      let closestIndex = 0
      let closestDistance = Infinity
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const sectionTop = section.offsetTop
        const sectionCenter = sectionTop + section.offsetHeight / 2
        const distance = Math.abs(viewportCenter - sectionCenter)
        
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = i
        }
      }
      
      return closestIndex
    }

    const scrollToSection = (index) => {
      if (index < 0 || index >= sections.length) return
      if (isScrolling.current) return
      
      isScrolling.current = true
      const section = sections[index]
      const scrollTarget = Math.max(0, section.offsetTop)
      
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      })

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 1200)
    }

    const handleWheel = (e) => {
      if (isScrolling.current) {
        e.preventDefault()
        return
      }

      const deltaY = e.deltaY
      wheelDelta += deltaY
      
      if (wheelTimeout) {
        clearTimeout(wheelTimeout)
      }

      wheelTimeout = setTimeout(() => {
        if (Math.abs(wheelDelta) < minWheelDelta) {
          wheelDelta = 0
          return
        }

        const currentSectionIndex = findCurrentSection()
        const isScrollingDown = wheelDelta > 0
        let targetIndex = currentSectionIndex

        if (isScrollingDown && currentSectionIndex < sections.length - 1) {
          targetIndex = currentSectionIndex + 1
        } else if (!isScrollingDown && currentSectionIndex > 0) {
          targetIndex = currentSectionIndex - 1
        }

        if (targetIndex !== currentSectionIndex) {
          e.preventDefault()
          scrollToSection(targetIndex)
        }

        wheelDelta = 0
      }, scrollDelay)
    }

    const handleKeyDown = (e) => {
      if (isScrolling.current) return
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return

      e.preventDefault()
      const currentSectionIndex = findCurrentSection()

      if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1)
      } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      if (wheelTimeout) {
        clearTimeout(wheelTimeout)
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return (
    <div className="App">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <Header isScrolled={isScrolled} isInHero={isInHero} />
      <Hero isInHero={isInHero} />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
