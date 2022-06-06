import React from 'react'
import { render } from '@testing-library/react'
import { MediaStateProvider, MediaType, useMediaQuery } from '../index'
import { renderHook } from '@testing-library/react-hooks'

describe('useMediaQuery', () => {
  it('should return mediaType', async () => {
    const { result } = renderHook<{}, MediaType>(() => useMediaQuery(), {
      wrapper: MediaStateProvider,
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(true)
    expect(result.current.isWideScreen).toBe(false)
  })
})

describe('MediaStateProvider', () => {
  it('should match snapshot', () => {
    expect(render(<MediaStateProvider />)).toMatchSnapshot()
  })
})
