import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Menu, generateMenuConfig } from '../menu'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({
    location: 'location',
  })),
}))

describe('Menu', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore({})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match a snapshot', () => {
    window.reapit.config.limitedUserAccessWhitelist = []
    expect(
      render(
        <Provider store={store}>
          <Menu />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('generateMenuConfig', () => {
    it('should return full config when user has access permissions', () => {
      window.reapit.config.limitedUserAccessWhitelist = []
      const location = {
        hash: 'mockHash',
        key: 'mockKey',
        pathname: 'mockPathname',
        search: '',
        state: {},
      }
      const session = {
        loginIdentity: {
          email: '',
          groups: ['ReapitEmployeeFoundationsAdmin'],
        },
      }
      const logout = jest.fn()
      const result = generateMenuConfig(logout, location, session)
      expect(result.menu.length).toBe(10)
    })

    it('should return config with just a login button when user has no access permissions', () => {
      window.reapit.config.limitedUserAccessWhitelist = []
      const location = {
        hash: 'mockHash',
        key: 'mockKey',
        pathname: 'mockPathname',
        search: '',
        state: {},
      }
      const session = {
        loginIdentity: {
          email: '',
          groups: [],
        },
      }
      const logout = jest.fn()
      const result = generateMenuConfig(logout, location, session)
      expect(result.menu.length).toBe(1)
    })

    it('should return config with limited access when the user is on a whitelist', () => {
      window.reapit.config.limitedUserAccessWhitelist = ['foo@bar.com']
      const location = {
        hash: 'mockHash',
        key: 'mockKey',
        pathname: 'mockPathname',
        search: '',
        state: {},
      }
      const session = {
        loginIdentity: {
          email: 'foo@bar.com',
          groups: ['ReapitEmployeeFoundationsAdmin'],
        },
      }
      const logout = jest.fn()
      const result = generateMenuConfig(logout, location, session)
      expect(result.menu.length).toBe(8)
    })
  })
})
