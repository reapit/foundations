import React from 'react'
import { shallow } from 'enzyme'
import {
  ChangePasswordForm,
  ChangePasswordFormProps,
  ChangePasswordValues,
  validateChangePasswordForm,
  mapPropsChangePassword,
  handleSubmitChangePassword
} from '../change-password-form'
import { mockFormikAction } from '@/utils/mock-formik'

jest.mock('@reapit/elements', () => ({
  fetcher: jest.fn().mockResolvedValue({ message: 'SUCCESS' })
}))

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
        password: '456',
        confirmPassword: '456'
      }
      const result = validateChangePasswordForm(mockValues)
      expect(result).toEqual({})
    })

    it('should return errors', () => {
      const mockValues: ChangePasswordValues = {
        currentPassword: '123',
        password: '456',
        confirmPassword: '4567'
      }
      const result = validateChangePasswordForm(mockValues)
      expect(result).toEqual({
        confirmPassword: 'Passwords do not match'
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
        password: '456',
        confirmPassword: '456'
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
