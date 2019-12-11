import * as React from 'react'
import { shallow } from 'enzyme'
import {
  Login,
  LoginProps,
  handleUseEffect,
  mapStateToProps,
  mapDispatchToProps,
  renderForm,
  onSubmitHandler
} from '@/components/pages/login'
import { ReduxState } from '@/types/core'
import { LOGIN_TYPE } from '@/constants/auth'
import { LoginParams } from '@reapit/cognito-auth'

describe('Login', () => {
  it('should match a snapshot', () => {
    let mock: any = jest.fn()

    const props: LoginProps = {
      error: false,
      login: mock,
      location: mock,
      history: mock,
      match: mock,
      hasSession: false
    }

    expect(shallow(<Login {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    let mock: any = jest.fn()

    const props: LoginProps = {
      error: false,
      login: mock,
      location: mock,
      history: mock,
      match: mock,
      hasSession: true
    }

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
      const fn = onSubmitHandler(mockSetIsSubmitting, mockLogin)
      const mockValues = {
        email: '',
        password: ''
      }
      fn(mockValues)
      expect(mockSetIsSubmitting).toHaveBeenCalledWith(true)
      expect(mockLogin).toHaveBeenCalledWith({
        userName: mockValues.email,
        password: mockValues.password,
        loginType: LOGIN_TYPE.CLIENT
      })
    })
  })

  describe('renderForm', () => {
    it('should match snapshot', () => {
      const component = renderForm({ isSubmitting: true, error: undefined })
      const wrapper = shallow(<div>{component()}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const component = renderForm({ isSubmitting: false, error: new Error('mock Error') })
      const wrapper = shallow(<div>{component()}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        auth: {
          loginSession: {},
          error: false
        }
      } as ReduxState
      const expected = {
        hasSession: true,
        error: false
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })

    it('should run correctly', () => {
      const mockState = {
        auth: {
          error: true
        }
      } as ReduxState
      const expected = {
        hasSession: false,
        error: true
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const { login } = mapDispatchToProps(mockDispatch)
      const mockParams = { userName: '', password: '', loginType: LOGIN_TYPE.CLIENT } as LoginParams
      login(mockParams)
      expect(mockDispatch).toBeCalled()
    })
  })
})
