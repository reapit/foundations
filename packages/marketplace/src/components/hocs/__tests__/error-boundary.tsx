import * as React from 'react'
import { shallow } from 'enzyme'
import { ErrorBoundary } from '../error-boundary'

jest.mock('@/utils/route-dispatcher')
const Children = () => <div>I am a component!</div>
const props = {
  children: Children,
}

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    expect(shallow(<ErrorBoundary {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    const component = shallow(<ErrorBoundary {...props} />)
    component.setState({
      hasFailed: true,
    })
    expect(component).toMatchSnapshot()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
