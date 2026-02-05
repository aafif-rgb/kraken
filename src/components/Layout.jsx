import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import LayoutContext from '../context/LayoutContext'
import Header from './Header'
import Footer from './Footer'
import '../App.css'

function Layout() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isOnHome = location.pathname === '/'
  const [isInHero, setIsInHero] = useState(isOnHome)
  const layoutValue = { isScrolled, isInHero }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      if (isOnHome) {
        const heroSection = document.getElementById('hero')
        if (heroSection) {
          const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
          const scrollPosition = window.scrollY + window.innerHeight / 2
          setIsInHero(scrollPosition < heroBottom)
        }
      } else {
        setIsInHero(false)
      }

      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOnHome])

  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-in-view')
          } else {
            entry.target.classList.remove('section-in-view')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <LayoutContext.Provider value={layoutValue}>
      <div className="App">
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </LayoutContext.Provider>
  )
}

export default Layout
