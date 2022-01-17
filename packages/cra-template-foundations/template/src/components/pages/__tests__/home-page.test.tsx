import React from 'react'
import { render } from '@testing-library/react'
import HomePage from '../home-page'

describe('HomePage', () => {
  it('should match a snapshot', () => {
    expect(render(<HomePage />)).toMatchSnapshot()
  })
})
