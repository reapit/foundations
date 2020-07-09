import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ErrorBoundary } from '../error-boundary'

const Component: React.FC = () => <div>I am a component!</div>
Component.displayName = 'Component'

const props = {
  children: Component,
}

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    expect(toJson(shallow(<ErrorBoundary {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    const component = shallow(<ErrorBoundary {...props} />)
    component.setState({
      hasFailed: true,
    })
    expect(toJson(component)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
