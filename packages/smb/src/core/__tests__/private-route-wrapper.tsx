import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
import * as AuthContext from '@/context/auth-context'

jest.mock('../../context/auth-context.tsx')
jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
  getSessionCookie: jest.fn(),
  getTokenFromQueryString: jest.fn(),
  redirectToOAuth: jest.fn(),
}))

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

const props: PrivateRouteWrapperProps = {
  path: '/',
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    search: '/client/apps?username=wmcvay@reapit.com&desktopToken=TOKEN',
  },
}

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(() => ({ ...contextValues, loginSession: null }))
    expect(toJson(shallow(<PrivateRouteWrapper {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot with loginSession', () => {
    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(() => ({ ...contextValues }))
    expect(toJson(shallow(<PrivateRouteWrapper {...props} />))).toMatchSnapshot()
  })
})
