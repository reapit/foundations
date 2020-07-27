import * as React from 'react'
import { MemoryRouter } from 'react-router'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Login, handleShowNotificationAfterPasswordChanged, onLoginButtonClick } from '../login'
import appState from '@/reducers/__stubs__/app-state'
import { showNotificationMessage } from '@/actions/notification-message'
import * as reapitConnectBrowserSessionModule from '@/core/connect-session'
import messages from '@/constants/messages'
import Routes from '@/constants/routes'
import { ReduxState } from '@/types/core'

jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
}))

const mockState = {
  ...appState,
  auth: {
    loginSession: null,
  },
} as ReduxState

describe('Login', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(
      mount(
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
      const fn = handleShowNotificationAfterPasswordChanged(true, localStorage, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(
        showNotificationMessage({ variant: 'info', message: messages.PASSWORD_CHANGED_SUCCESSFULLY }),
      )
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
