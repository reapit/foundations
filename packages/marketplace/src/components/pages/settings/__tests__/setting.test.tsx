import React from 'react'
import { mount } from 'enzyme'
import { Settings, handleLogout } from '../setting'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { reapitConnectBrowserSession } from '@/core/connect-session'

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
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.SETTINGS, key: 'clientSettingsRoute' }]}>
            <Settings />
          </MemoryRouter>
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match snapshot in desktop mode', () => {
    /**
     * TODO(auth)
     * remove the store
     */
    /**
     * TODO(auth)
     * remove the store
     */
    expect(
      mount(
        <MemoryRouter initialEntries={[{ pathname: Routes.SETTINGS, key: 'clientSettingsRoute' }]}>
          <Settings />
        </MemoryRouter>,
      ),
    ).toMatchSnapshot()
  })

  /**
   * TODO(auth)
   * mock like auth page
   */
  describe('handleLogout', () => {
    it('should run correctly', () => {
      handleLogout()
      expect(reapitConnectBrowserSession.connectLogoutRedirect).toHaveBeenCalled()
    })
  })
})
