import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { DARK_THEME_LOCAL_STOREAGE_KEY, useDarkTheme, UseDarkThemeInterface } from '..'

describe('use-dark-theme', () => {
  xit('can load use-dark-theme', () => {
    const { result } = renderHook<undefined, UseDarkThemeInterface>(useDarkTheme, {
      wrapper: () => <div></div>,
    })

    expect(result.current.isDark).toBeFalsy()
    expect(result.current.isLight).toBeTruthy()

    act(() => {
      result.current.togglDarkTheme()
    })

    expect(result.current.isDark).toBeTruthy()
    expect(result.current.isLight).toBeFalsy()
    expect(JSON.parse(localStorage.getItem(DARK_THEME_LOCAL_STOREAGE_KEY) as string).isDark).toBeTruthy()
  })

  xit('can load use-dark-theme with localstorage preset', () => {
    localStorage.setItem(DARK_THEME_LOCAL_STOREAGE_KEY, JSON.stringify({ isDark: true }))

    const { result } = renderHook<undefined, UseDarkThemeInterface>(useDarkTheme, {
      wrapper: () => <div></div>,
    })

    expect(result.current.isDark).toBeTruthy()
    expect(result.current.isLight).toBeFalsy()

    act(() => {
      result.current.togglDarkTheme()
    })

    expect(result.current.isDark).toBeFalsy()
    expect(result.current.isLight).toBeTruthy()
    expect(localStorage.getItem(DARK_THEME_LOCAL_STOREAGE_KEY)).toBeFalsy()
  })
})
