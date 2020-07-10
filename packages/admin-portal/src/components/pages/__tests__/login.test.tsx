import * as React from 'react'
import { MemoryRouter } from 'react-router'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Login, onLoginButtonClick } from '../login'
import appState from '@/reducers/__stubs__/app-state'
import * as cognito from '@reapit/cognito-auth'
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
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(mockState)
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
  describe('onLoginButtonClick', () => {
    it('should run correctly', () => {
      const spyRedirectToLogin = jest.spyOn(cognito, 'redirectToLogin')
      onLoginButtonClick()
      expect(spyRedirectToLogin).toBeCalled()
    })
  })
})
