import * as React from 'react'
import { shallow } from 'enzyme'
import { Login, LoginProps, mapStateToProps, mapDispatchToProps } from '../login'
import { ReduxState } from '@/types/core'
import { getMockRouterProps } from '@/utils/mock-helper'

const props: LoginProps = {
  showNotiAfterPasswordChanged: jest.fn(),
  hasSession: false,
  authChangeLoginType: jest.fn(),
  loginType: 'CLIENT',
  ...getMockRouterProps({}),
}

describe('Login', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(shallow(<Login {...props} />)).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const input = {
        auth: {
          loginSession: {},
          refreshSession: {},
          loginType: 'CLIENT',
        },
      } as ReduxState
      const output = {
        hasSession: true,
        loginType: 'CLIENT',
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
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
