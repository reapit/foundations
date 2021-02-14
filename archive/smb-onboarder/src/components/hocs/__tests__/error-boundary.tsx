import * as React from 'react'
import { shallow, mount } from 'enzyme'
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
    const Children = () => {
      throw new Error('123')
    }
    const component = mount(
      <ErrorBoundary>
        <Children />
      </ErrorBoundary>,
    )
    expect(toJson(component)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
