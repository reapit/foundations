import React from 'react'
import { shallow } from 'enzyme'
import {
  ChangePasswordForm,
  ChangePasswordFormProps,
  ChangePasswordValues,
  mapPropsChangePassword,
  handleSubmitChangePassword
} from '../change-password-form'
import { mockFormikAction } from '@/utils/mock-formik'
import { validate } from '@/utils/form/change-password'

describe('ChangePasswordForm', () => {
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: false,
      isValidating: false,
      isValid: true
    } as ChangePasswordFormProps
    const wrapper = shallow(<ChangePasswordForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: true,
      isValidating: true,
      isValid: false
    } as ChangePasswordFormProps
    const wrapper = shallow(<ChangePasswordForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  describe('validateChangePasswordForm', () => {
    it('should not return errors', () => {
      const mockValues: ChangePasswordValues = {
        currentPassword: '123',
        password: 'Password1',
        confirmPassword: 'Password1'
      }
      const result = validate(mockValues)
      expect(result).toEqual({})
    })

    it('should return errors when passwords do not match', () => {
      const mockValues: ChangePasswordValues = {
        currentPassword: '123',
        password: 'Password1',
        confirmPassword: 'Password2'
      }
      const result = validate(mockValues)
      expect(result).toEqual({
        confirmPassword: 'Passwords do not match.'
      })
    })

    it('should return errors when password is invalid', () => {
      const mockValues: ChangePasswordValues = {
        currentPassword: '123',
        password: 'abc@123',
        confirmPassword: 'abc@123'
      }
      const result = validate(mockValues)
      expect(result).toEqual({
        password:
          'Your Password should be a minimum of 8 characters; must contain at least one lowercase letter, one uppercase letter and one number.'
      })
    })
  })

  describe('mapPropsChangePassword', () => {
    it('should run correctly', () => {
      const result = mapPropsChangePassword()
      expect(result).toEqual({
        currentPassword: '',
        password: '',
        confirmPassword: ''
      })
    })
  })
  describe('handleSubmitChangePassword', () => {
    it('should call setSubmitting', () => {
      const mockValues: ChangePasswordValues = {
        currentPassword: '123',
        password: 'Password1',
        confirmPassword: 'Password1'
      }
      const mockForm = {
        ...mockFormikAction
      }
      const mockProps = {
        changePassword: jest.fn(),
        email: 'test@gmail.com'
      }
      handleSubmitChangePassword(mockValues, { ...mockForm, props: mockProps })
      expect(mockForm.setSubmitting).toBeCalledWith(true)
      expect(mockProps.changePassword).toBeCalled()
    })
  })
})
