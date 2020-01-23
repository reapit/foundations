import React from 'react'
import { shallow } from 'enzyme'
import { ForgotPassword, mapDispatchToProps, mapStateToProps } from '../forgot-password'
import { getMockRouterProps } from '@/utils/mock-helper'
import { ReduxState } from '@/types/core'

describe('ForgotPassword', () => {
  it('should match snapshot', () => {
    const mockProps = {
      ...getMockRouterProps({}),
      location: {
        hash: '',
        key: '',
        pathname: '',
        state: {},
        search: '?isSuccessRequestResetPassword=1'
      },
      loading: false,
      submitEmail: jest.fn()
    }
    const wrapper = shallow(<ForgotPassword {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('[className="pb-8"]')).toHaveLength(1)
    expect(wrapper.find('EnhanceForgotPasswordForm')).toHaveLength(1)
  })

  it('should match snapshot', () => {
    const mockProps = {
      ...getMockRouterProps({}),
      location: {
        hash: '',
        key: '',
        pathname: '',
        state: {},
        search: ''
      },
      loading: true,
      submitEmail: jest.fn()
    }
    const wrapper = shallow(<ForgotPassword {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('EnhanceForgotPasswordForm')).toHaveLength(0)
    expect(wrapper.find('Loader')).toHaveLength(1)
  })
  describe('mapDispatchToProps', () => {
    it('should call dispatch when call submitEmail', () => {
      const mockDispatch = jest.fn()
      const { submitEmail } = mapDispatchToProps(mockDispatch)
      submitEmail('abc@gmail.com')
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const mockState = {
        forgotPassword: {
          loading: true
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({ loading: true })
    })

    it('should return undefined', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({ loading: undefined })
    })
  })
})
