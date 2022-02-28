import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../error-boundary'

const Component: React.FC = () => <div>I am a component!</div>
Component.displayName = 'Component'

const props = {
  children: Component,
}

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    render(<ErrorBoundary {...props} />)
    expect(screen).toMatchSnapshot()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
