import React from 'react'
import { mount } from 'enzyme'
import { ClientSettingsPage, handleLogout } from '../setting'
import { authLogout } from '@/actions/auth'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

describe('ClientSettingsPage', () => {
  it('should match snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(appState)

    expect(
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.SETTINGS, key: 'clientSettingsRoute' }]}>
            <ClientSettingsPage />
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
