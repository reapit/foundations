import * as React from 'react'
import { render } from '@testing-library/react'
import { createBrowserHistory } from 'history'
import { AuthContext } from '@/core'
import { mockContext } from '@/core/__mocks__/mock-context'
import { AuthHook } from '@/hooks/use-auth'
import * as cognito from '@reapit/cognito-auth'
import { redirectToLoginPage, Login } from '@/components/pages/login/login'
import { Router, Route } from 'react-router-dom'

jest.mock('@reapit/cognito-auth')

jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
  getTokenFromQueryString: jest.fn(),
  getSessionCookie: jest.fn(),
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    const history = createBrowserHistory()
    const wrapper = render(
      <AuthContext.Provider value={mockContext}>
        <Router history={history}>
          <Route>
            <Login />
          </Route>
        </Router>
      </AuthContext.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(
      <AuthContext.Provider value={{} as AuthHook}>
        <Login />
      </AuthContext.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should call redirectToLogin a snapshot', () => {
    const spy = jest.spyOn(cognito, 'redirectToLogin')
    redirectToLoginPage()
    expect(spy).toBeCalled()
  })
})
