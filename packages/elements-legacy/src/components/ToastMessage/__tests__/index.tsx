import * as React from 'react'
import { render } from '../../../tests/react-testing'
import toJson from 'enzyme-to-json'
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
    expect(toJson(render(<ToastMessage {...baseProps} />))).toMatchSnapshot()
  })

  it('should match a snapshot when pass different props', () => {
    expect(toJson(render(<ToastMessage {...defaultProps} />))).toMatchSnapshot()
  })

  it('should dismiss toast when click', () => {
    render(<ToastMessage {...defaultProps} visible={true} />)
      .find('[data-test="toast-wrapper"]')
      .first()
      .simulate('click')

    expect(defaultProps.onCloseToast).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
