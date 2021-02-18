import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { ErrorBoundary } from '../error-boundary'

const Component: React.FC = () => <div>I am a component!</div>
Component.displayName = 'Component'

const props = {
  children: Component,
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

  it('should catch an error when a component throws', () => {
    const DangerousComponent = () => {
      throw new Error('Some Error')
    }
    const component = mount(
      <ErrorBoundary {...props}>
        <DangerousComponent></DangerousComponent>
      </ErrorBoundary>,
    )

    expect(component.state()).toEqual({ hasFailed: true })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
