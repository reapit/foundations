import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { ErrorBoundary } from '../error-boundary'

describe('ErrorBoundary', () => {
  it('should match snapshot', () => {
    expect(render(<ErrorBoundary />)).toMatchSnapshot()
  })

  it('should match snapshot when error', () => {
    const wrapper = render(<ErrorBoundary />)
    wrapper.setState({
      hasFailed: true,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
