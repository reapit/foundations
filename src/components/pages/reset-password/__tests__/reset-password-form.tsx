import React from 'react'
import { shallow } from 'enzyme'
import {
  ResetPasswordFormProps,
  ResetPasswordForm,
  mapPropsToValues,
  ResetPasswordValues,
  validateResetPasswordForm,
  parseQueryParamsToToken,
  handleSubmitResetPassword,
  mapDispatchToProps
} from '../reset-password-form'
import { getMockRouterProps } from '@/utils/mock-helper'
import { mockFormikAction } from '@/utils/mock-formik'

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

  describe('parseQueryParamsToToken', () => {
    it('should return correctly', () => {
      const mockQueryParams = '?token=1234'
      const result = parseQueryParamsToToken(mockQueryParams)
      const output = '1234'
      expect(result).toEqual(output)
    })

    it('should return ""', () => {
      const mockQueryParams = '?token='
      const result = parseQueryParamsToToken(mockQueryParams)
      const output = ''
      expect(result).toEqual(output)
    })

    it('should return ""', () => {
      const mockQueryParams = ''
      const result = parseQueryParamsToToken(mockQueryParams)
      const output = ''
      expect(result).toEqual(output)
    })

    it('should return ""', () => {
      const mockQueryParams = '='
      const result = parseQueryParamsToToken(mockQueryParams)
      const output = ''
      expect(result).toEqual(output)
    })
  })

  describe('handleSubmitResetPassword', () => {
    it('should call setSubmitting', done => {
      const mockValues: ResetPasswordValues = {
        password: '456',
        confirmPassword: '456'
      }
      const mockForm = {
        ...mockFormikAction
      }
      const mockProps = {
        errorNotification: jest.fn(),
        logout: jest.fn(),
        ...getMockRouterProps({})
      }
      handleSubmitResetPassword(mockValues, { ...mockForm, props: mockProps })
      setTimeout(() => {
        expect(mockForm.setSubmitting).toBeCalledWith(false)
        expect(mockProps.history.replace).toBeCalledWith('/developer/login?isChangePasswordSuccess=1')
        done()
      }, 2000)
    })

    it('should not call setSubmitting', done => {
      const mockValues: ResetPasswordValues = {
        password: '456',
        confirmPassword: '456'
      }
      const mockForm = {
        ...mockFormikAction
      }
      const mockProps = {
        errorNotification: jest.fn(),
        logout: jest.fn(),
        ...getMockRouterProps({}),
        location: {
          hash: '',
          key: '',
          pathname: '',
          search: '',
          state: {}
        }
      }
      handleSubmitResetPassword(mockValues, { ...mockForm, props: mockProps })
      setTimeout(() => {
        expect(mockForm.setSubmitting).toBeCalledWith(false)
        expect(mockProps.history.replace).not.toBeCalledWith('/developer/login?isChangePasswordSuccess=1')
        done()
      }, 2000)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when errorNotification', () => {
      const mockDispatch = jest.fn()
      const { errorNotification } = mapDispatchToProps(mockDispatch)
      errorNotification()
      expect(mockDispatch).toBeCalled()
    })
  })
})
