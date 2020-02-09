import * as React from 'react'
import { shallow } from 'enzyme'
import { Login, LoginProps, mapStateToProps, mapDispatchToProps } from '../login'
import { ReduxState } from '@/types/core'

const props: LoginProps = {
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
