import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { AuthContext } from '@/core/index'
import { mockContext } from '@/core/__mocks__/mock-context'
import { AuthHook } from '@/hooks/use-auth'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
import { getMockRouterProps } from '../__mocks__/mock-router'

const session = {
  accessToken: '123',
  accessTokenExpiry: 1583492838,
  idToken: '123',
  idTokenExpiry: 1583492838,
  refreshToken: '123',
  cognitoClientId: 'ue1e0vujti1p9f133ckfkbkdh',
  loginType: 'CLIENT',
  userName: 'cbryan@reapit.com',
  mode: 'WEB',
  loginIdentity: {
    name: 'Craig Bryan',
    email: 'cbryan@reapit.com',
    developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
    clientId: 'DXX',
    adminId: '1',
    userCode: 'LJW',
  },
}

jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
  getSessionCookie: jest.fn(),
  getTokenFromQueryString: jest.fn(),
  redirectToOAuth: jest.fn(),
  getSession: jest.fn(() => session),
}))

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    const props: PrivateRouteWrapperProps = {
      path: '/client/apps',
      ...getMockRouterProps({ params: {}, search: '?username=wmcvay@reapit.com&desktopToken=TOKEN' }),
    }
    const history = createBrowserHistory()
    const wrapper = render(
      <AuthContext.Provider value={mockContext}>
        <Router history={history}>
          <Route>
            <PrivateRouteWrapper {...props} />
          </Route>
        </Router>
      </AuthContext.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot', () => {
    const props: PrivateRouteWrapperProps = {
      path: '/client/apps',
      ...getMockRouterProps({ params: {}, search: '?username=wmcvay@reapit.com&desktopToken=TOKEN' }),
    }
    const wrapper = render(
      <AuthContext.Provider value={{} as AuthHook}>
        <PrivateRouteWrapper {...props} />
      </AuthContext.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
