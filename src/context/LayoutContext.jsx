import { createContext, useContext } from 'react'

const LayoutContext = createContext({ isScrolled: false, isInHero: false })

export function useLayout() {
  return useContext(LayoutContext)
}

export default LayoutContext
