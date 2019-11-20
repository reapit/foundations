import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/utils/mock-helper'
import { mockFormikAction, mockWithFormik } from '@/utils/mock-formik'
import {
  ForgotPasswordForm,
  mapPropsToValues,
  ForgotPasswordValues,
  handleSubmitForgotPassword,
  ForgotPasswordFormProps
} from '../forgot-password-form'

describe('ForgotPasswordForm', () => {
  it('should match snapshot', () => {
    const mockProps = {
      ...mockWithFormik({ email: '1' })
    } as ForgotPasswordFormProps
    const wrapper = shallow(<ForgotPasswordForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('[dataTest="email"]')).toHaveLength(1)
  })

  describe('mapPropsToValues', () => {
    it('should run correctly', () => {
      const result = mapPropsToValues()
      expect(result).toEqual({ email: '' })
    })
  })

  describe('mapPropsToValues', () => {
    it('should run correctly', () => {
      const result = mapPropsToValues()
      expect(result).toEqual({ email: '' })
    })
  })

  describe('handleSubmitForgotPassword', () => {
    it('should call setSubmitting with false', done => {
      const mockValues = {
        email: 'abc@gmail.com'
      } as ForgotPasswordValues
      const mockProps = {
        ...getMockRouterProps({})
      }
      const mockFormik = {
        ...mockFormikAction
      }
      handleSubmitForgotPassword(mockValues, { ...mockFormik, props: mockProps })
      setTimeout(() => {
        expect(mockProps.history.push).toBeCalled()
        expect(mockFormik.setSubmitting).toBeCalledWith(false)
        done()
      }, 2000)
    })
  })
})
