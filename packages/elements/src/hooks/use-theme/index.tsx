import { useEffect, useState } from 'react'

export interface UseThemeInterface<T> {
  togglTheme: (theme: keyof T) => void
  currentTheme: string
}

export type UseThemeHookFunction<T> = (props: { initialSelection?: keyof T; themes?: T }) => UseThemeInterface<T>

export const THEME_BODY_CLASS = 'theme'
export const THEME_LOCAL_STOREAGE_KEY = `reapit-foundations-${THEME_BODY_CLASS}`

export const useTheme: UseThemeHookFunction<{}> = ({ initialSelection = 'default' }) => {
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

  const [theme, setTheme] = useState(initialSelection)

  useEffect(() => {
    const body = document.getElementsByTagName('body')

    if (body.length >= 1) {
      theme ? body[0].classList.add(THEME_BODY_CLASS) : body[0].classList.remove(THEME_BODY_CLASS)
    }
    localStorage && localStorage.setItem(THEME_LOCAL_STOREAGE_KEY, JSON.stringify({ theme }))
  }, [theme])

  const togglTheme = (theme) => setTheme(theme)

  return {
    togglTheme,
    currentTheme: theme,
  }
}
