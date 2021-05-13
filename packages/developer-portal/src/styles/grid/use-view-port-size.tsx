import { useEffect, useState } from 'react'

export type ViewPortSize = 'MOBILE' | 'TABLET' | 'DESKTOP'

export const useViewPortSize = (): ViewPortSize => {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  // Not sure about these dimensions - possibly allow for more breakpoints - tablet a bit big?
  if (windowWidth <= 768) return 'MOBILE'
  if (windowWidth <= 1024) return 'TABLET'
  return 'DESKTOP'
}
