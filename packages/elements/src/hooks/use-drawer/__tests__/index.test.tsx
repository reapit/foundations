import React from 'react'
import { render } from '@testing-library/react'
import { useDrawer, UseDrawer } from '../index'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useDrawer', () => {
  it('should return UseDrawer type correctly', async () => {
    const { result } = renderHook<{}, UseDrawer>(() => useDrawer('some-div'))
    const Drawer = result.current[0]

    expect(render(<Drawer />)).toMatchSnapshot()

    act(() => {
      result.current[1]()
    })

    expect(result.current[3]).toBe(true)

    act(() => {
      result.current[2]()
    })

    expect(result.current[3]).toBe(false)
  })
})
