import * as React from 'react'
import { ErrorBoundary } from '../error-boundary'
import { render } from '@testing-library/react'

const Component: React.FC = () => <div>I am a component!</div>
Component.displayName = 'Component'

const props = {
  children: Component,
}

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    expect(render(<ErrorBoundary {...props} />)).toMatchSnapshot()
  })

  it('should catch an error when a component throws', () => {
    const DangerousComponent = () => {
      throw new Error('Some Error')
    }
    const component = render(
      <ErrorBoundary {...props}>
        <DangerousComponent></DangerousComponent>
      </ErrorBoundary>,
    )

    expect(component.getByText('Something went wrong here, try refreshing your page.')).toBeTruthy()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
