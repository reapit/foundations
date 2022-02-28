import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Nav } from '../nav'

describe('Menu', () => {
  it('should match a snapshot', () => {
    render(<Nav />)
    expect(screen).toMatchSnapshot()
  })
})
