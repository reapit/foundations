import React from 'react'
import { render } from '../../../tests/react-testing'
import { usePortal, Portal } from '../index'
import { renderHook } from '@testing-library/react-hooks'

describe('usePortal', () => {
  xit('should return a target  div correctly', async () => {
    const { result } = renderHook<{}, {}>(() => usePortal('some-div'))

    expect(result.current).toMatchSnapshot()
  })
})

describe('Portal', () => {
  it('should match a snapshot and render children', async () => {
    expect(render(<Portal id="some-id">I am some content</Portal>)).toMatchSnapshot()
  })
})
