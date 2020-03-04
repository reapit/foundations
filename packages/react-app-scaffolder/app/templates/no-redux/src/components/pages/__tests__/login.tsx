import * as React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../login'
import * as AuthContext from '@/context/auth-context'
import { redirectToLogin } from '@reapit/cognito-auth'
import { Button } from '@reapit/elements'

jest.mock('@/context/auth-context.tsx')
jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
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

describe('Login', () => {
  it('should match a snapshot', () => {
    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(() => ({ ...contextValues, loginSession: null }))

    expect(shallow(<Login />)).toMatchSnapshot()
  })

  it('loginHandler should run correcly', () => {
    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(() => ({ ...contextValues, loginSession: null }))

    const wrapper = shallow(<Login />)

    wrapper.find(Button).simulate('click')

    expect(redirectToLogin).toBeCalledWith(
      process.env.COGNITO_CLIENT_ID_APP_NAME as string,
      `${window.location.origin}`,
    )
  })

  it('should match a snapshot with loginSession', () => {
    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(() => contextValues)
    expect(shallow(<Login />)).toMatchSnapshot()
  })
})
