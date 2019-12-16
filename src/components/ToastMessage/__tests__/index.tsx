import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ToastMessage, ToastMessageProps, ToastVariant } from '..'

const defaultProps: ToastMessageProps = {
  visible: true,
  message: 'Toast message',
  variant: 'primary',
  onCloseToast: jest.fn()
}

describe('ToastMessage', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<ToastMessage {...defaultProps} />))).toMatchSnapshot()
  })

  it('should dismiss toast when click', () => {
    shallow(<ToastMessage {...defaultProps} />)
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
