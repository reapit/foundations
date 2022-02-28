import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Container } from '../container'

describe('Container', () => {
  it('should match a snapshot', () => {
    render(<Container width={0} />)
    expect(screen).toMatchSnapshot()
  })
})
