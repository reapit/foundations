import * as React from 'react'
import { render } from '@testing-library/react'
import { createBrowserHistory } from 'history'
import { AuthContext } from '@/context'
import { mockContext } from '@/context/__mocks__/mock-context'
import { AuthHook } from '@/hooks/use-auth'
import { redirectToLoginPage, Login } from '@/components/pages/login/login'
import { Router, Route } from 'react-router-dom'
import { reapitConnectBrowserSession } from '@/core/connect-session'

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
    const spy = jest.spyOn(reapitConnectBrowserSession, 'connectLoginRedirect')
    redirectToLoginPage()
    expect(spy).toBeCalled()
  })
})
