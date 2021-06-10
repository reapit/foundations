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
  const [mediaType, setMediaType] = useState<MediaType>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isWideScreen: false,
  })

  useEffect(() => {
    const onResize = () => {
      const windowWidth = window.innerWidth
      const isMobile = windowWidth < 768
      const isTablet = windowWidth >= 768 && windowWidth < 1024
      const isDesktop = windowWidth >= 1024 && windowWidth < 1400
      const isWideScreen = windowWidth >= 1400

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
  const mediaType = useContext(MediaStateContext)

  return mediaType
}
