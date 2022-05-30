import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { getDefaultNavIndex, Menu, XmasLogo } from '../menu'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Routes from '../../../constants/routes'

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
      render(
        <Provider store={store}>
          <Menu />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('XmasLogo', () => {
    it('should match a snapshot', () => {
      expect(render(<XmasLogo />)).toMatchSnapshot()
    })
  })
})

describe('getDefaultNavIndex', () => {
  const routes = [
    {
      route: Routes.APPS,
      index: 1,
    },
    {
      route: Routes.APP_DETAIL,
      index: 1,
    },
    {
      route: Routes.INSTALLED_APPS,
      index: 2,
    },
    {
      route: Routes.MY_APPS,
      index: 3,
    },
    {
      route: Routes.MY_APPS_PAGINATE,
      index: 3,
    },
    {
      route: Routes.APP_DETAIL_MANAGE,
      index: 3,
    },
    {
      route: Routes.SETTINGS,
      index: 5,
    },
    {
      route: '/',
      index: 0,
    },
  ]

  routes.forEach((route) => {
    it(`should correctly return the default nav index for ${route.route}`, () => {
      expect(getDefaultNavIndex(route.route)).toEqual(route.index)
    })
  })
})
