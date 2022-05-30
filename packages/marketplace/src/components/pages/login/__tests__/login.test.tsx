import * as React from 'react'
import { MemoryRouter } from 'react-router'
import * as ReactRedux from 'react-redux'
import { render } from '../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import { Login, handleShowNotificationAfterPasswordChanged, onLoginButtonClick } from '../login'
import appState from '@/reducers/__stubs__/app-state'
import * as reapitConnectBrowserSessionModule from '@/core/connect-session'
import Routes from '@/constants/routes'
import { ReduxState } from '@/types/core'

const mockState = {
  ...appState,
  auth: {
    loginSession: null,
  },
} as ReduxState

describe('Login', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.LOGIN, key: 'clientLoginRoute' }]}>
            <Login />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleShowNotificationAfterPasswordChanged', () => {
    it('should notify that the password has been changed', () => {
      const spyLocalStorageRemoveItem = jest.spyOn(window.localStorage, 'removeItem')
      const fn = handleShowNotificationAfterPasswordChanged(true, localStorage)
      fn()
      expect(spyLocalStorageRemoveItem).toBeCalledWith('isPasswordChanged')
    })
  })

  describe('onLoginButtonClick', () => {
    it('should run correctly', () => {
      const spyRedirectToLogin = jest.spyOn(
        reapitConnectBrowserSessionModule.reapitConnectBrowserSession,
        'connectLoginRedirect',
      )
      onLoginButtonClick()
      expect(spyRedirectToLogin).toBeCalled()
    })
  })
})
