import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, generateMenuConfig, XmasLogo } from '../menu'
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

  describe('XmasLogo', () => {
    it('should match a snapshot', () => {
      expect(shallow(<XmasLogo />)).toMatchSnapshot()
    })
  })
})
