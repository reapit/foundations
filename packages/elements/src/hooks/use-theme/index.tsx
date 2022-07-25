/* istanbul ignore file */
import { useEffect, useRef, useState } from 'react'

export interface UseThemeInterface {
  toggleTheme: (theme: string) => void
  currentTheme: string
}

export const THEME_BODY_CLASS = 'reapit-theme'
export const THEME_LOCAL_STOREAGE_KEY = `reapit-foundations-${THEME_BODY_CLASS}`

// TODO determine dark theme on default by using media selectors?
// (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
/**
 *
 * window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
 *   const newColorScheme = event.matches ? "dark" : "light";
 * })
 *
 */
export const useTheme = ({ initialSelection = 'default' }: { initialSelection?: string }): UseThemeInterface => {
  // Initial setting of theme from localStorage
  useEffect(() => {
    if (localStorage) {
      const storedValue = localStorage.getItem(`reapit-foundations-${THEME_BODY_CLASS}`)
      if (!storedValue) return

      const json = JSON.parse(storedValue)
      const initialSelection = json.theme

      if (typeof initialSelection === 'string') {
        setTheme(initialSelection)
      }
    }
  }, [])

  const [theme, setTheme] = useState<string>(initialSelection)
  const themeRef = useRef<string>(initialSelection)

  // When theme is changed, toggle body classes and reset localStorage value
  useEffect(() => {
    const body = document.getElementsByTagName('body')

    if (body.length >= 1) {
      body[0].classList.add(`${THEME_BODY_CLASS}-${theme}`)

      if (themeRef.current) {
        body[0].classList.remove(`${THEME_BODY_CLASS}-${themeRef.current}`)
      }
    }

    themeRef.current = theme
    localStorage && localStorage.setItem(THEME_LOCAL_STOREAGE_KEY, JSON.stringify({ theme }))
  }, [theme])

  const toggleTheme = (theme) => setTheme(theme)

  return {
    toggleTheme,
    currentTheme: theme,
  }
}
