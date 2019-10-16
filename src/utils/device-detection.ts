import { useEffect, useState } from 'react'

export function isAndroid() {
  return navigator.userAgent.toLowerCase().indexOf('android') > -1
}

export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function isMacLike() {
  return navigator.userAgent.indexOf('Mac OS X') > -1
}

export function isMobile() {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  return windowWidth <= 768
}
