import * as React from 'react'
import { shallow } from 'enzyme'
import {
  Login,
  LoginProps,
  renderForm,
  onSubmitHandler,
  LoginFormValues,
  mapStateToProps,
  mapDispatchToProps,
  resetSubmitting,
} from '@/components/pages/login'
import { ReduxState } from '@/types/core'
import { LoginParams } from '@reapit/cognito-auth'

const props = (hasSession: boolean): LoginProps => ({
  error: false,
  hasSession,
  login: jest.fn(),
  // @ts-ignore: just pick the needed props for the test
  history: {},
})

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Login {...props(false)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when hasSession', () => {
    expect(shallow(<Login {...props(true)} />)).toMatchSnapshot()
  })

  describe('renderForm', () => {
    it('should match a snapshot when ERROR true', () => {
      const fn = renderForm({ isSubmitting: false, error: true })()
      expect(fn).toMatchSnapshot()
    })

    it('should match a snapshot when ERROR true', () => {
      const fn = renderForm({ isSubmitting: false, error: false })()
      expect(fn).toMatchSnapshot()
    })
  })

  describe('onSubmitHandler', () => {
    const mockProps = {
      setIsSubmitting: jest.fn(),
      login: jest.fn(),
    }
    const mockValues = {} as LoginFormValues
    it('should run correctly', () => {
      onSubmitHandler(mockProps)(mockValues)
      expect(mockProps.setIsSubmitting).toBeCalledWith(true)
      expect(mockProps.login).toBeCalledWith({ ...mockValues, loginType: 'CLIENT' })
    })
  })

  describe('resetSubmitting', () => {
    const setIsSubmitting = jest.fn()
    it('should run correctly', () => {
      resetSubmitting(true, setIsSubmitting)()
      expect(setIsSubmitting).toBeCalledWith(false)
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        auth: {
          refreshSession: null,
          loginSession: null,
          error: false,
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        hasSession: false,
        error: false,
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { login } = mapDispatchToProps(mockDispatch)
      login({} as LoginParams)
      expect(mockDispatch).toBeCalled()
    })
  })
})
