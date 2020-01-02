import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/utils/mock-helper'
import { mockFormikAction, mockWithFormik } from '@/utils/mock-formik'
import {
  ForgotPasswordForm,
  mapPropsToValues,
  ForgotPasswordValues,
  handleSubmitForgotPassword,
  ForgotPasswordFormProps,
  SuccessForgetPasswordContent
} from '../forgot-password-form'

describe('ForgotPasswordForm', () => {
  it('should match snapshot', () => {
    const mockProps = {
      ...mockWithFormik({ email: '1' }),
      ...getMockRouterProps({}),
      getFieldHelpers: jest.fn()
    } as ForgotPasswordFormProps
    const wrapper = shallow(<ForgotPasswordForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('[dataTest="email"]')).toHaveLength(1)
  })

  it('should match snapshot', () => {
    const mockProps = {
      ...mockWithFormik({ email: '1' }),
      ...getMockRouterProps({}),
      location: {
        hash: '',
        key: '',
        pathname: '',
        search: '?isError=1',
        state: {}
      },
      getFieldHelpers: jest.fn()
    } as ForgotPasswordFormProps
    const wrapper = shallow(<ForgotPasswordForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('[dataTest="email"]')).toHaveLength(1)
  })

  it('should match snapshot', () => {
    const mockProps = {
      ...mockWithFormik({ email: '1' }),
      ...getMockRouterProps({}),
      location: {
        hash: '',
        key: '',
        pathname: '',
        search: '?isSuccess=1',
        state: {}
      },
      getFieldHelpers: jest.fn()
    } as ForgotPasswordFormProps
    const wrapper = shallow(<ForgotPasswordForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
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
        ...getMockRouterProps({}),
        submitEmail: jest.fn()
      }
      const mockFormik = {
        ...mockFormikAction
      }
      setTimeout(() => {
        handleSubmitForgotPassword(mockValues, { ...mockFormik, props: mockProps })
        expect(mockProps.submitEmail).toBeCalled()
        done()
      }, 1000)
    })
  })
})

describe('SuccessForgetPasswordContent', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SuccessForgetPasswordContent />)
    expect(wrapper).toMatchSnapshot()
  })
})
