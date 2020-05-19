import * as React from 'react'
import { MemoryRouter } from 'react-router'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Login, handleShowNotificationAfterPasswordChanged, handleChangeLoginType, onLoginButtonClick } from '../login'
import appState from '@/reducers/__stubs__/app-state'
import { showNotificationMessage } from '@/actions/notification-message'
import { authChangeLoginType } from '@/actions/auth'
import { LoginType } from '@reapit/cognito-auth'
import * as cognito from '@reapit/cognito-auth'
import messages from '@/constants/messages'
import Routes from '@/constants/routes'

jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
}))

describe('Login', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT_LOGIN, key: 'clientLoginRoute' }]}>
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
  describe('handleChangeLoginType', () => {
    it('should run correctly', () => {
      const mockLoginType: LoginType = 'CLIENT'
      const fn = handleChangeLoginType(spyDispatch, mockLoginType)
      fn()
      expect(spyDispatch).toBeCalledWith(authChangeLoginType(mockLoginType))
    })
  })
  describe('onLoginButtonClick', () => {
    it('should run correctly', () => {
      const spyRedirectToLogin = jest.spyOn(cognito, 'redirectToLogin')
      const mockLoginType: LoginType = 'CLIENT'
      const mockIsDeveloperFirstTimeLoginComplete = true
      const mockIsClientFirstTimeLoginComplete = true
      const fn = onLoginButtonClick(
        mockLoginType,
        mockIsDeveloperFirstTimeLoginComplete,
        mockIsClientFirstTimeLoginComplete,
      )
      fn()
      expect(spyRedirectToLogin).toBeCalled()
    })
  })
})
