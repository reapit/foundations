import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, logout, generateMenuConfig } from '../menu'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
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
    expect(
      shallow(
        <Provider store={store}>
          <Menu />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('generateMenuConfig', () => {
    it('should return config', () => {
      const location = {
        hash: 'mockHash',
        key: 'mockKey',
        pathname: 'mockPathname',
        search: '',
        state: {},
      }
      const result = generateMenuConfig(location)
      expect(result).toBeDefined()
    })
  })

  describe('logout', () => {
    it('should call functions', () => {
      const mockDispatch = jest.fn()
      const mockAuthLogout = jest.fn(() => 'logout') as any
      const fn = logout({ dispatch: mockDispatch, authLogout: mockAuthLogout })
      fn()
      expect(mockDispatch).toHaveBeenCalledWith('logout')
    })
  })
})
