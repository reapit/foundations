import React from 'react'
import { Settings } from '..'
import { render } from '../../../../tests/react-testing'

describe('Settings', () => {
  it('should match snapshot', () => {
    expect(render(<Settings />)).toMatchSnapshot()
  })
})
