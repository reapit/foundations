import * as React from 'react'
import { shallow } from 'enzyme'
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
      shallow(
        <Provider store={store}>
          <Menu />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('XmasLogo', () => {
    it('should match a snapshot', () => {
      expect(shallow(<XmasLogo />)).toMatchSnapshot()
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
      route: Routes.ANALYTICS,
      index: 2,
    },

    {
      route: Routes.ANALYTICS_TAB,
      index: 2,
    },
    {
      route: Routes.SWAGGER,
      index: 3,
    },
    {
      route: Routes.GRAPHQL,
      index: 3,
    },
    {
      route: Routes.WEBHOOKS_ABOUT,
      index: 3,
    },
    {
      route: Routes.WEBHOOKS_NEW,
      index: 3,
    },
    {
      route: Routes.WEBHOOKS_MANAGE,
      index: 3,
    },
    {
      route: Routes.WEBHOOKS_LOGS,
      index: 3,
    },
    {
      route: Routes.ELEMENTS,
      index: 4,
    },
    {
      route: Routes.API_DOCS,
      index: 5,
    },
    {
      route: Routes.DESKTOP,
      index: 6,
    },
    {
      route: Routes.HELP,
      index: 8,
    },
    {
      route: Routes.SETTINGS,
      index: 9,
    },
    {
      route: Routes.SETTINGS_BILLING_TAB,
      index: 9,
    },
    {
      route: Routes.SETTINGS_ORGANISATION_TAB,
      index: 9,
    },
    {
      route: Routes.SETTINGS_PROFILE_TAB,
      index: 9,
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
