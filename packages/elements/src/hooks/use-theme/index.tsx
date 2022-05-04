import { useEffect, useRef, useState } from 'react'

export interface UseThemeInterface<T> {
  togglTheme: (theme: T) => void
  currentTheme: keyof T
}

export const THEME_BODY_CLASS = 'reapit-theme'
export const THEME_LOCAL_STOREAGE_KEY = `reapit-foundations-${THEME_BODY_CLASS}`

export const useTheme = <T extends string[]>({
  initialSelection = 'default' as keyof T,
}: {
  initialSelection?: keyof T
}): UseThemeInterface<T> => {
  // Initial setting of theme from localStorage
  useEffect(() => {
    if (localStorage) {
      const storedValue = localStorage.getItem(`reapit-foundations-${THEME_BODY_CLASS}`)
      if (!storedValue) return

      const json = JSON.parse(storedValue)
      const initialSelection = json.theme

      if (typeof initialSelection === 'string') {
        setTheme(initialSelection as keyof T)
      }
    }
  }, [])

  const [theme, setTheme] = useState<keyof T>(initialSelection)
  const themeRef = useRef<keyof T>(initialSelection)

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

  const togglTheme = (theme) => setTheme(theme)

  return {
    togglTheme,
    currentTheme: theme,
  }
}
