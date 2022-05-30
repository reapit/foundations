import * as React from 'react'
import { render } from '../../../tests/react-testing'
import Settings from '../settings'

describe('Settings', () => {
  it('should match a snapshot', () => {
    expect(render(<Settings />)).toMatchSnapshot()
  })
})
