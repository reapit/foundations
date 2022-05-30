import React from 'react'
import { render } from '../../../tests/react-testing'
import { Dispatch } from 'redux'
import { Settings, createDispatchers } from '../setting'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { ReapitConnectSession } from '@reapit/connect-session'
import { changePassword as changePasswordAction } from '@/actions/cognito-identity'

jest.mock('@/core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectLogoutRedirect: jest.fn(),
  },
}))

describe('Settings', () => {
  it('should match snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(appState)

    expect(
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.SETTINGS, key: 'clientSettingsRoute' }]}>
            <Settings />
          </MemoryRouter>
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('createDispatchers', () => {
    test('should return correctly', () => {
      const mockDispatch = jest.fn()
      const connectSession = {
        loginIdentity: {
          email: 'tester@reapit',
        },
      }
      const { changePassword } = createDispatchers(mockDispatch as Dispatch, connectSession as ReapitConnectSession)

      const mockChangePasswordParam = {
        currentPassword: 'a',
        password: 'a',
        confirmPassword: 'a',
        email: 'tester@reapit',
      }
      changePassword(mockChangePasswordParam)
      expect(mockDispatch).toHaveBeenCalledWith(changePasswordAction(mockChangePasswordParam))
    })
  })
})
