import React from 'react'
import { render } from '../../../tests/react-testing'
import { UsagePage } from '../index'

describe('UsagePage', () => {
  it('should match a snapshot', () => {
    expect(render(<UsagePage />)).toMatchSnapshot()
  })
})
