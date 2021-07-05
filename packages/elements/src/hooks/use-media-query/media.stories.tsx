import React from 'react'
import { useMediaQuery } from '.'

export const MediaMobileExample = () => {
  const { isMobile } = useMediaQuery()

  return isMobile ? <h1>Is Mobile</h1> : <h1>Not Mobile</h1>
}

export const AllBreakPointExample = () => {
  const { isMobile, isTablet, isDesktop, isWideScreen, isSuperWideScreen, is4KScreen, } = useMediaQuery()

  if (isMobile) {
    return <h1>Is Mobile</h1>
  }

  else if (isTablet) {
    return <h1>Is Tablet</h1>
  }

  else if (isDesktop) {
    return <h1>Is Tablet</h1>
  }

  else if (isWideScreen) {
    return <h1>Is Tablet</h1>
  }

  else if (isSuperWideScreen) {
    return <h1>Is Tablet</h1>
  }

  else if (is4KScreen) {
    return <h1>Is Tablet</h1>
  }
}