import * as React from 'react'
import { render } from '@testing-library/react'
import { ToastMessage, ToastMessageProps } from '..'

const baseProps: ToastMessageProps = {
  message: 'Toast message',
  variant: 'primary',
  onCloseToast: jest.fn(),
}
const defaultProps: ToastMessageProps = {
  ...baseProps,
  visible: true,
  displayDuration: 5000,
}

describe('ToastMessage', () => {
  it('should match a snapshot with default baseProps', () => {
    expect(render(<ToastMessage {...baseProps} />)).toMatchSnapshot()
  })

  it('should match a snapshot when pass different props', () => {
    expect(render(<ToastMessage {...defaultProps} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
