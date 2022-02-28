import React from 'react'
import Apps from '..'
import { render } from '../../../../tests/react-testing'

describe('Apps', () => {
  it('should match a snapshot', () => {
    expect(render(<Apps />)).toMatchSnapshot()
  })
})
