import { useEffect, useState } from 'react'

export interface MediaType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const useMediaQuery = (): MediaType => {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth <= 1024
  const isDesktop = windowWidth > 1024

  return {
    isMobile,
    isTablet,
    isDesktop,
  }
}
