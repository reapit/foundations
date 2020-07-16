import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { AuthContext } from '../../context'
import { mockContext } from '../../context/__mocks__/mock-context'
import { AuthHook } from '../../hooks/use-auth'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
import { getMockRouterProps } from '../__mocks__/mock-router'

jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
  getSessionCookie: jest.fn(),
  getTokenFromQueryString: jest.fn(),
  redirectToOAuth: jest.fn(),
  getSession: jest.fn(() => require('../__mocks__/session').session),
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
