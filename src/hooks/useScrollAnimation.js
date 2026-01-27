import { useEffect, useRef } from 'react'

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null)
  const { threshold = 0.1, delay = 0 } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-visible')
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, delay])

  return elementRef
}
