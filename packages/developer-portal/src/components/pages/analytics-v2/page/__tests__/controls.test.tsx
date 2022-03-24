import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { Controls } from '../controls'

describe('Controls', () => {
  it('should match a snapshot', () => {
    expect(render(<Controls />)).toMatchSnapshot()
  })
})
