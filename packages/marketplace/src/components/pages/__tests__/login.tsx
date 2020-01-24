import * as React from 'react'
import { shallow } from 'enzyme'
import { Login, LoginProps, handleUseEffect, onSubmitHandler, mapStateToProps, mapDispatchToProps } from '../login'
import { ReduxState } from '@/types/core'
import { LoginParams } from '@reapit/cognito-auth'

const props: LoginProps = {
  error: false,
  hasSession: false,
  login: jest.fn(),
  authChangeLoginType: jest.fn(),
  loginType: 'CLIENT',
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    pathname: '/client',
  },
}

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Login {...props} />)).toMatchSnapshot()
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const mockSetIsSubmitting = jest.fn()
      const mockError = new Error('mock Error')
      const fn = handleUseEffect({ setIsSubmitting: mockSetIsSubmitting, error: mockError })
      fn()
      expect(mockSetIsSubmitting).toBeCalledWith(false)
    })
  })

  describe('onSubmitHandler', () => {
    it('should run correctly', () => {
      const mockSetIsSubmitting = jest.fn()
      const mockLogin = jest.fn()
      const loginType = 'ADMIN'
      const mode = 'WEB'
      const fn = onSubmitHandler({ setIsSubmitting: mockSetIsSubmitting, login: mockLogin, loginType, mode })
      const mockValues = {
        email: '',
        password: '',
      }
      fn(mockValues)
      expect(mockSetIsSubmitting).toHaveBeenCalledWith(true)
      expect(mockLogin).toHaveBeenCalledWith({
        email: mockValues.email,
        mode,
        loginType,
        password: mockValues.password,
      })
    })
  })
  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const input = {
        auth: {
          loginSession: {},
          refreshSession: {
            mode: 'WEB',
          },
          error: {},
          loginType: 'CLIENT',
        },
      } as ReduxState
      const output = {
        hasSession: true,
        error: {},
        loginType: 'CLIENT',
        mode: 'WEB',
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    describe('login', () => {
      it('should call dispatch correctly', () => {
        const mockDispatch = jest.fn()
        const { login } = mapDispatchToProps(mockDispatch)
        const mockParams = {
          userName: '',
          password: '',
          loginType: 'CLIENT',
          mode: 'DESKTOP',
        } as LoginParams
        login(mockParams)
        expect(mockDispatch).toBeCalled()
      })
    })

    describe('authChangeLoginType', () => {
      it('should call dispatch correctly', () => {
        const mockDispatch = jest.fn()
        const { authChangeLoginType } = mapDispatchToProps(mockDispatch)
        authChangeLoginType('CLIENT')
        expect(mockDispatch).toBeCalled()
      })
    })
  })
})
