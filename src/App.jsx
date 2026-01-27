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
    let currentSectionIndex = 0
    const snapThreshold = 100 // pixels from top/bottom to trigger snap

    const findCurrentSection = () => {
      const scrollPosition = window.scrollY
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          return i
        }
      }
      return 0
    }

    const scrollToSection = (index, position = 'top') => {
      if (index < 0 || index >= sections.length) return
      
      isScrolling.current = true
      const section = sections[index]
      let scrollTarget = section.offsetTop
      
      // If scrolling to bottom of section
      if (position === 'bottom') {
        scrollTarget = section.offsetTop + section.offsetHeight - window.innerHeight
      }
      
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      })

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 800)
    }

    const handleWheel = (e) => {
      if (isScrolling.current) {
        e.preventDefault()
        return
      }

      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      currentSectionIndex = findCurrentSection()
      
      if (currentSectionIndex === -1) return
      
      const currentSection = sections[currentSectionIndex]
      const sectionTop = currentSection.offsetTop
      const sectionBottom = sectionTop + currentSection.offsetHeight
      const sectionHeight = currentSection.offsetHeight
      const distanceFromTop = scrollY - sectionTop
      const distanceFromBottom = sectionBottom - (scrollY + windowHeight)
      
      const deltaY = e.deltaY
      const isScrollingDown = deltaY > 0
      const isScrollingUp = deltaY < 0

      // If section is taller than viewport, allow normal scrolling unless near edges
      if (sectionHeight > windowHeight) {
        // Near top of section and scrolling up - go to previous section
        if (isScrollingUp && distanceFromTop < snapThreshold && currentSectionIndex > 0) {
          e.preventDefault()
          scrollToSection(currentSectionIndex - 1, 'bottom')
          return
        }
        
        // Near bottom of section and scrolling down - go to next section
        if (isScrollingDown && distanceFromBottom < snapThreshold && currentSectionIndex < sections.length - 1) {
          e.preventDefault()
          scrollToSection(currentSectionIndex + 1, 'top')
          return
        }
        
        // Allow normal scrolling within the section
        return
      } else {
        // Section fits in viewport - snap to next/previous
        if (isScrollingDown && currentSectionIndex < sections.length - 1) {
          e.preventDefault()
          scrollToSection(currentSectionIndex + 1)
        } else if (isScrollingUp && currentSectionIndex > 0) {
          e.preventDefault()
          scrollToSection(currentSectionIndex - 1)
        }
      }
    }

    const handleKeyDown = (e) => {
      if (isScrolling.current) return

      currentSectionIndex = findCurrentSection()
      if (currentSectionIndex === -1) return

      const currentSection = sections[currentSectionIndex]
      const sectionHeight = currentSection.offsetHeight
      const windowHeight = window.innerHeight

      // For keyboard, always snap to next/previous section
      if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
        e.preventDefault()
        scrollToSection(currentSectionIndex + 1)
      } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
        e.preventDefault()
        scrollToSection(currentSectionIndex - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
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
