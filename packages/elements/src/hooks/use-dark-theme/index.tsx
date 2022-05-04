import React, { useEffect, useState } from 'react'

export interface UseDarkThemeInterface {
  togglDarkTheme: () => void
  isDark: boolean
  isLight: boolean
}

export const DARK_THEME_BODY_CLASS = 'dark-theme'
export const DARK_THEME_LOCAL_STOREAGE_KEY = `reapit-foundations-${DARK_THEME_BODY_CLASS}`

export const useDarkTheme = (initialSelection: boolean = false): UseDarkThemeInterface => {
  useEffect(() => {
    if (localStorage) {
      const storedValue = localStorage.getItem(`reapit-foundations-${DARK_THEME_BODY_CLASS}`)
      if (!storedValue) return

      const json = JSON.parse(storedValue)
      const initialSelection = json.isDark

      if (typeof initialSelection === 'boolean') {
        setIsDark(initialSelection)
      }
    }
  }, [])

  const [isDark, setIsDark] = useState(initialSelection)

  useEffect(() => {
    const body = document.getElementsByTagName('body')

    if (body.length >= 1) {
      isDark ? body[0].classList.add(DARK_THEME_BODY_CLASS) : body[0].classList.remove(DARK_THEME_BODY_CLASS)
    }
    localStorage && localStorage.setItem(DARK_THEME_LOCAL_STOREAGE_KEY, JSON.stringify({ isDark }))
  }, [isDark])

  const togglDarkTheme = () => setIsDark(!isDark)

  return {
    togglDarkTheme,
    isDark,
    isLight: !isDark,
  }
}
