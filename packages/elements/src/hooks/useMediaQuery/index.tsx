import { useEffect, useState } from 'react'

export interface MediaType {

}

export const useViewPortSize = (): ViewPortSize => {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  if (windowWidth <= 768) return 'MOBILE'
  if (windowWidth <= 1024) return 'TABLET'
  return 'DESKTOP'
}
