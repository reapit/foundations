import { render } from '@testing-library/react'
import React from 'react'
import { UsagePage } from '../index'

describe('UsagePage', () => {
  it('should match a snapshot', () => {
    expect(render(<UsagePage />)).toMatchSnapshot()
  })
})
