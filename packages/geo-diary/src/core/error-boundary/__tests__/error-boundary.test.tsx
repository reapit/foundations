import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { ErrorBoundary } from '../error-boundary'

const Component: React.FC = () => <div>I am a component!</div>
Component.displayName = 'Component'

const props = {
  children: Component,
}

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    const wrapper = render(<ErrorBoundary {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    const wrapper = render(<ErrorBoundary {...props} />)
    wrapper.setState({
      hasFailed: true,
    })
    expect(wrapper).toMatchSnapshot()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
