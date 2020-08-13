import React from 'react'
import { shallow } from 'enzyme'
import { ChangePasswordForm, handleSubmitChangePassword, ChangePasswordValues } from '../change-password-form'
import { FormikHelpers } from '@reapit/elements'

describe('ChangePasswordForm', () => {
  it('should match snapshot', () => {
    const mockProps = {
      changePassword: jest.fn(),
      loading: false,
    }
    const wrapper = shallow(<ChangePasswordForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
describe('handleSubmitChangePassword', () => {
  it('should call setSubmitting', () => {
    const mockValues: ChangePasswordValues = {
      currentPassword: '123',
      password: 'Password1',
      confirmPassword: 'Password1',
    }
    const changePassword = jest.fn()
    const mockFormikProps = ({
      setSubmitting: jest.fn(),
    } as unknown) as FormikHelpers<ChangePasswordValues>
    const spy = jest.spyOn(mockFormikProps, 'setSubmitting')

    const fn = handleSubmitChangePassword(changePassword)
    fn(mockValues, mockFormikProps)

    expect(spy).toBeCalledWith(true)
    expect(changePassword).toHaveBeenCalledWith(mockValues)
  })
})
