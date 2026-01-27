import { useRef, useEffect } from 'react'

export const useTilt = (options = {}) => {
  const cardRef = useRef(null)
  const { 
    maxRotation = 15, 
    perspective = 1000,
    scale = 1.05,
    transitionSpeed = 0.1
  } = options

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    let isHovering = false

    const handleMouseMove = (e) => {
      if (!isHovering) return
      
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxRotation
      const rotateY = ((x - centerX) / centerX) * maxRotation

      // Apply tilt transform - inline styles override CSS
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
      card.style.willChange = 'transform'
    }

    const handleMouseEnter = () => {
      isHovering = true
      card.style.transition = `transform ${transitionSpeed}s ease-out`
    }

    const handleMouseLeave = () => {
      isHovering = false
      card.style.transition = `transform 0.5s ease-out`
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`
      
      setTimeout(() => {
        if (!isHovering) {
          card.style.willChange = 'auto'
          // Clear transform to let CSS handle it again
          card.style.transform = ''
          card.style.transition = ''
        }
      }, 500)
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
      card.style.transform = ''
      card.style.transition = ''
      card.style.willChange = ''
    }
  }, [maxRotation, perspective, scale, transitionSpeed])

  return cardRef
}
