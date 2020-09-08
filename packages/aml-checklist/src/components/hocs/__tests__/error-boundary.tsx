import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { ErrorBoundary, ErrorState } from '../error-boundary'

jest.mock('../../../utils/route-dispatcher')
jest.mock('rc-animate')

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    expect(shallow(<ErrorBoundary />)).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    const component = shallow(<ErrorBoundary />)
    component.setState({
      hasFailed: true,
    })
    expect(component).toMatchSnapshot()
  })

  it('should call the notification sets the state to hasFailed when it catches', () => {
    ;(console.error as any) = jest.fn()
    const DangerousChild = () => {
      throw new Error('Catch me if you can')
    }

    const component = mount(
      <ErrorBoundary>
        <DangerousChild />
      </ErrorBoundary>,
    )
    expect(DangerousChild).toThrow()
    expect((component.state() as ErrorState).hasFailed).toBe(true)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
