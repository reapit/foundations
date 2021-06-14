import React, { createContext, useContext, useEffect, useState } from 'react'

export interface MediaType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isWideScreen: boolean
}

export const MOBILE_BREAKPOINT = 768
export const TABLET_BREAKPOINT = 1024
export const DESKTOP_BREAKPOINT = 1400

export const MediaStateContext = createContext<MediaType>({} as MediaType)

const { Provider } = MediaStateContext

export const MediaStateProvider: React.FC = ({ children }) => {
  const initialWindowWidth = window.innerWidth
  const [mediaType, setMediaType] = useState<MediaType>({
    isMobile: initialWindowWidth < MOBILE_BREAKPOINT,
    isTablet: initialWindowWidth >= MOBILE_BREAKPOINT && initialWindowWidth < TABLET_BREAKPOINT,
    isDesktop: initialWindowWidth >= TABLET_BREAKPOINT && initialWindowWidth < DESKTOP_BREAKPOINT,
    isWideScreen: initialWindowWidth >= DESKTOP_BREAKPOINT,
  })

  useEffect(() => {
    const onResize = () => {
      const windowWidth = window.innerWidth
      const isMobile = windowWidth < MOBILE_BREAKPOINT
      const isTablet = windowWidth >= MOBILE_BREAKPOINT && windowWidth < TABLET_BREAKPOINT
      const isDesktop = windowWidth >= TABLET_BREAKPOINT && windowWidth < DESKTOP_BREAKPOINT
      const isWideScreen = windowWidth >= DESKTOP_BREAKPOINT

      setMediaType({
        isMobile,
        isTablet,
        isDesktop,
        isWideScreen,
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  return <Provider value={mediaType}>{children}</Provider>
}

export const useMediaQuery = (): MediaType => {
  return useContext(MediaStateContext)
}
