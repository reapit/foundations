import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { THEME_LOCAL_STOREAGE_KEY, useTheme, UseThemeInterface } from '..'

describe('use-theme', () => {
  xit('can load use-theme', () => {
    const { result } = renderHook<{}, UseThemeInterface>(useTheme, {
      wrapper: () => <div></div>,
    })

    expect(result.current.currentTheme).toBe('default')

    act(() => {
      result.current.toggleTheme('new-theme')
    })

    expect(result.current.currentTheme).toBe('new-theme')
    expect(JSON.parse(localStorage.getItem(THEME_LOCAL_STOREAGE_KEY) as string).theme).toBe('new-theme')
  })

  xit('can load use-theme with localstorage preset', () => {
    localStorage.setItem(THEME_LOCAL_STOREAGE_KEY, JSON.stringify({ theme: 'my-saved-theme' }))

    const { result } = renderHook<{}, UseThemeInterface>(useTheme, {
      wrapper: () => <div></div>,
    })

    expect(result.current.currentTheme).toBe('my-saved-theme')

    act(() => {
      result.current.toggleTheme('another-theme')
    })

    expect(result.current.currentTheme).toBe('another-theme')
    expect(JSON.parse(localStorage.getItem(THEME_LOCAL_STOREAGE_KEY) as string).theme).toBe('another-theme')
  })
})
