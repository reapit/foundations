import * as React from 'react'
import { shallow } from 'enzyme'
import { ErrorBoundary } from '../error-boundary'

describe('ErrorBoundary', () => {
  it('should match snapshot', () => {
    expect(shallow(<ErrorBoundary />)).toMatchSnapshot()
  })

  it('should match snapshot when error', () => {
    const wrapper = shallow(<ErrorBoundary />)
    wrapper.setState({
      hasFailed: true,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
