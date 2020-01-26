import * as React from 'react'
import { shallow } from 'enzyme'
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
    expect(toJson(shallow(<ToastMessage {...baseProps} />))).toMatchSnapshot()
  })

  it('should match a snapshot when pass different props', () => {
    expect(toJson(shallow(<ToastMessage {...defaultProps} />))).toMatchSnapshot()
  })

  it('should dismiss toast when click', () => {
    shallow(<ToastMessage {...defaultProps} visible={true} />)
      .find('[data-test="toast-wrapper"]')
      .first()
      .simulate('click')

    expect(defaultProps.onCloseToast).toHaveBeenCalledTimes(1)
  })

  it('should dismiss toast after 3 seconds', () => {
    jest.useFakeTimers()
    shallow(<ToastMessage {...defaultProps} />)
    jest.runAllTimers()
    expect(defaultProps.onCloseToast).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
