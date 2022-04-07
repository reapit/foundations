/* istanbul ignore file */
import React from 'react'
import { useMediaQuery } from '.'

export const MediaMobileExample = () => {
  const { isMobile } = useMediaQuery()

  return isMobile ? <h1>Is Mobile</h1> : <h1>Not Mobile</h1>
}

export const AllBreakPointExample = () => {
  const { isMobile, isTablet, isDesktop, isWideScreen, isSuperWideScreen, is4KScreen } = useMediaQuery()

  if (isMobile) {
    return <h1>Is Mobile</h1>
  }

  if (isTablet) {
    return <h1>Is Tablet</h1>
  }

  if (isDesktop) {
    return <h1>Is Tablet</h1>
  }

  if (isWideScreen) {
    return <h1>Is Tablet</h1>
  }

  if (isSuperWideScreen) {
    return <h1>Is Tablet</h1>
  }

  if (is4KScreen) {
    return <h1>Is Tablet</h1>
  }
}
