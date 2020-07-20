import React from 'react'
import { mount } from 'enzyme'
import { Settings, handleLogout } from '../setting'
import { authLogout } from '@/actions/auth'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

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
    const mockStore = configureStore()
    const store = mockStore({
      ...appState,
      auth: {
        ...appState.auth,
        refreshSession: {
          ...appState.auth.refreshSession,
          mode: 'DESKTOP',
        },
      },
    })

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

  it('should handleLogout run correctly', () => {
    const dispatch = jest.fn()
    const fn = handleLogout(dispatch)
    fn()
    expect(dispatch).toBeCalledWith(authLogout())
  })
})
