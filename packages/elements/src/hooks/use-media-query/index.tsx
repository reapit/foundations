import { useEffect, useState } from 'react'

export interface MediaType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const MOBILE_BREAKPOINT = 768
export const TABLET_BREAKPOINT = 1024

export const useMediaQuery = (): MediaType => {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  const isMobile = windowWidth < MOBILE_BREAKPOINT
  const isTablet = windowWidth >= MOBILE_BREAKPOINT && windowWidth <= TABLET_BREAKPOINT
  const isDesktop = windowWidth > TABLET_BREAKPOINT

  return {
    isMobile,
    isTablet,
    isDesktop,
  }
}
