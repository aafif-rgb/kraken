import { useEffect, useRef } from 'react'

export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrolled
      const elementHeight = rect.height
      
      if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = -(scrolled - elementTop) * speed
        element.style.transform = `translateY(${yPos}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return elementRef
}
