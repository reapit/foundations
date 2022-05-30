import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { ErrorBoundary, ErrorState } from '../error-boundary'

jest.mock('../../../utils/route-dispatcher')
jest.mock('rc-animate')

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    expect(render(<ErrorBoundary />)).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    const component = render(<ErrorBoundary />)
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

    const component = render(
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
