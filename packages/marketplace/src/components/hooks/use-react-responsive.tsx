import { useMediaQuery } from 'react-responsive'

const useReactResponsive = () => {
  const isLargeDesktop: boolean = useMediaQuery({ minWidth: 1216 })
  const isDesktop: boolean = useMediaQuery({ minWidth: 1024 })
  const isTablet: boolean = useMediaQuery({ minWidth: 769, maxWidth: 1023 })
  const isMobile: boolean = useMediaQuery({ maxWidth: 768 })
  const isPortrait: boolean = useMediaQuery({ orientation: 'portrait' })

  return {
    isDesktop,
    isTablet,
    isMobile,
    isLargeDesktop,
    isPortrait,
  }
}

export default useReactResponsive
