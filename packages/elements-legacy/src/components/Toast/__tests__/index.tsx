import * as React from 'react'
import { render } from '@testing-library/react'
import { Toast, ToastProps } from '..'

const defaultProps = {
  serverError: {
    type: 'SERVER',
    message: 'Something went wrong fetching data',
  },
  componentError: {
    type: 'COMPONENT',
    message: 'Something went wrong with this component',
  },
  errorClearedServer: jest.fn(),
  errorClearedComponent: jest.fn(),
} as ToastProps

const props = (newProps?: Partial<ToastProps>): ToastProps => ({
  ...defaultProps,
  ...newProps,
})

describe('Toast', () => {
  it('should match a snapshot for a serverError', () => {
    const newProps = {
      componentError: null,
    }
    expect(render(<Toast {...props(newProps)} />)).toMatchSnapshot()
  })

  it('should match a snapshot for a componentError', () => {
    const newProps = {
      serverError: null,
    }
    expect(render(<Toast {...props(newProps)} />)).toMatchSnapshot()
  })

  it('should dismiss a server error after 5 seconds', () => {
    jest.useFakeTimers()
    const newProps = {
      componentError: null,
    }
    render(<Toast {...props(newProps)} />)
    jest.runAllTimers()
    expect(defaultProps.errorClearedServer).toHaveBeenCalledTimes(1)
  })

  it('should dismiss a component error after 5 seconds', () => {
    jest.useFakeTimers()
    const newProps = {
      serverError: null,
    }
    render(<Toast {...props(newProps)} />)
    jest.runAllTimers()
    expect(defaultProps.errorClearedComponent).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
