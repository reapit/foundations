import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, MenuProps, generateMenuConfig, callbackAppClick } from '../menu'
import toJson from 'enzyme-to-json'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import * as AuthContext from '@/context/auth-context'

const contextValues: AuthContext.AuthContext = {
  logout: jest.fn(),
  getLoginSession: jest.fn(),
  setAuthState: jest.fn(),
  fetching: false,
  loginSession: {
    userName: '1',
    accessToken: '1',
    accessTokenExpiry: 1000,
    idToken: '1',
    idTokenExpiry: 1000,
    refreshToken: 'string',
    loginType: 'DEVELOPER',
    loginIdentity: {
      email: '1',
      name: '1',
      developerId: null,
      clientId: null,
      adminId: null,
      userCode: null,
    },
    mode: 'WEB',
    cognitoClientId: '1',
  },
}

const props = {
  ...getMockRouterProps({ params: {}, search: '' }),
} as MenuProps

describe('Menu', () => {
  it('should match a snapshot', () => {
    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(() => ({ ...contextValues }))

    expect(toJson(shallow(<Menu {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const loginSession = { ...contextValues.loginSession, mode: 'DESKTOP' }

    jest
      .spyOn(AuthContext, 'useAuthContext')
      .mockImplementation(() => ({ ...contextValues, loginSession } as AuthContext.AuthContext))

    expect(toJson(shallow(<Menu {...props} />))).toMatchSnapshot()
  })

  describe('generateMenuConfig', () => {
    it('should return config', () => {
      const logoutCallback = jest.fn()
      const result = generateMenuConfig(logoutCallback, props.location, 'WEB')
      expect(result).toBeDefined()
    })
  })

  describe('callbackAppClick', () => {
    it('should run correcly', () => {
      const fn = callbackAppClick()
      expect(fn).toEqual('https://marketplace.reapit.cloud/client/installed')
    })
  })
})
