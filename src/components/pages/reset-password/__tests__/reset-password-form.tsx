import React from 'react'
import { shallow } from 'enzyme'
import {
  ResetPasswordFormProps,
  ResetPasswordForm,
  mapPropsToValues,
  ResetPasswordValues,
  validateResetPasswordForm,
  handleSubmitResetPassword,
  mapDispatchToProps,
  mapStateToProps
} from '../reset-password-form'
import { getMockRouterProps } from '@/utils/mock-helper'
import { mockFormikAction } from '@/utils/mock-formik'
import { ReduxState } from '@/types/core'

describe('ResetPasswordForm', () => {
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: false,
      isValidating: false,
      isValid: true
    } as ResetPasswordFormProps
    const wrapper = shallow(<ResetPasswordForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapPropsToValues', () => {
    it('should run correctly', () => {
      const result = mapPropsToValues()
      expect(result).toEqual({
        password: '',
        confirmPassword: ''
      })
    })
  })

  describe('validateResetPasswordForm', () => {
    it('should not return errors', () => {
      const mockValues: ResetPasswordValues = {
        password: '456',
        confirmPassword: '456'
      }
      const result = validateResetPasswordForm(mockValues)
      expect(result).toEqual({})
    })

    it('should return errors', () => {
      const mockValues: ResetPasswordValues = {
        password: '456',
        confirmPassword: '4567'
      }
      const result = validateResetPasswordForm(mockValues)
      expect(result).toEqual({
        confirmPassword: 'Passwords do not match'
      })
    })
  })

  describe('handleSubmitResetPassword', () => {
    it('should not call resetPassword', done => {
      const mockValues: ResetPasswordValues = {
        password: '456',
        confirmPassword: '456'
      }
      const mockForm = {
        ...mockFormikAction
      }
      const mockProps = {
        resetPassword: jest.fn(),
        logout: jest.fn(),
        ...getMockRouterProps({})
      }
      handleSubmitResetPassword(mockValues, { ...mockForm, props: mockProps })
      setTimeout(() => {
        expect(mockProps.resetPassword).not.toBeCalled()
        done()
      }, 2000)
    })
  })

  describe('handleSubmitResetPassword', () => {
    it('should call resetPassword', done => {
      const mockValues: ResetPasswordValues = {
        password: '456',
        confirmPassword: '456'
      }
      const mockForm = {
        ...mockFormikAction
      }
      const mockProps = {
        resetPassword: jest.fn(),
        logout: jest.fn(),
        ...getMockRouterProps({}),
        location: {
          hash: '',
          key: '',
          pathname: '',
          search: '?userName=mockEmail@gmail.com&verificationCode=123',
          state: {}
        }
      }
      handleSubmitResetPassword(mockValues, { ...mockForm, props: mockProps })
      setTimeout(() => {
        expect(mockProps.resetPassword).toBeCalled()
        done()
      }, 2000)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when errorNotification', () => {
      const mockDispatch = jest.fn()
      const { resetPassword } = mapDispatchToProps(mockDispatch)
      resetPassword({
        confirmPassword: '123',
        password: '123',
        email: 'abc@gmail.com',
        verificationCode: '123'
      })
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        resetPassword: {
          loading: true
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      const output = {
        loading: true
      }
      expect(result).toEqual(output)
    })
  })
})
