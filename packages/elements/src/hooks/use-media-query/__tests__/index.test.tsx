import React from 'react'
import { MediaType, useMediaQuery } from '../index'
import { renderHook } from '@testing-library/react-hooks'

describe('useMediaQuery', () => {
  it('should return pwaNavState and setPwaNavState', async () => {
    const { result } = renderHook<{}, MediaType>(() => useMediaQuery(), {
      wrapper: (props) => <div>{props.children}</div>,
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isDesktop).toBe(false)
  })
})
