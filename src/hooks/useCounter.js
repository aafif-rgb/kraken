import { useEffect, useState, useRef } from 'react'

export const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const startTime = Date.now()
            const startValue = 0
            const endValue = parseInt(target.replace(/\D/g, ''))
            const suffix = target.replace(/\d/g, '')

            const animate = () => {
              const now = Date.now()
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4)
              const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
              
              setCount(current + suffix)

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(target)
              }
            }

            animate()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [target, duration])

  return [count, elementRef]
}
