import * as React from 'react'
import { render } from '@testing-library/react'
import { shallow } from 'enzyme'
import { Button } from '@reapit/elements'
import { ReapitConnectBrowserSessionInstance } from '../../../core/connect-session'
import { createBrowserHistory } from 'history'
import { AuthContext } from '../../../context'
import { mockContext } from '../../../context/__mocks__/mock-context'
import { AuthHook } from '../../../hooks/use-auth'
import { Login } from '../login'
import { Router, Route } from 'react-router-dom'

jest.mock('../../../core/connect-session', () => ({
  ReapitConnectBrowserSessionInstance: {
    instance: {
      connectLoginRedirect: jest.fn(),
    },
  },
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
})

describe('loginHandler', () => {
  it('should correctly call redirect on click', () => {
    const wrapper = shallow(<Login />)

    wrapper
      .find(Button)
      .first()
      .simulate('click')

    expect(ReapitConnectBrowserSessionInstance.instance.connectLoginRedirect).toHaveBeenCalledTimes(1)
  })
})
