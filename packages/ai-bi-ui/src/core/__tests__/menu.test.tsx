import React from 'react'
import { getDefaultNavIndex, Menu } from '../menu'
import Routes from '../../constants/routes'
import { render } from '../../tests/react-testing'

describe('Menu', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match a snapshot', () => {
    expect(render(<Menu />)).toMatchSnapshot()
  })

  // describe('XmasLogo', () => {
  //   it('should match a snapshot', () => {
  //     expect(render(<XmasLogo />)).toMatchSnapshot()
  //   })
  // })
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
      route: Routes.ANALYTICS_COSTS,
      index: 2,
    },
    {
      route: Routes.ANALYTICS_API_CALLS,
      index: 2,
    },
    {
      route: Routes.ANALYTICS_INSTALLATIONS,
      index: 2,
    },
    {
      route: Routes.ANALYTICS_COST_CALCULATOR,
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
      route: Routes.DESKTOP,
      index: 3,
    },
    {
      route: Routes.ELEMENTS,
      index: 4,
    },
    {
      route: Routes.API_DOCS,
      index: 6,
    },
    {
      route: Routes.ANALYTICS_SCHEMA_DOCS,
      index: 6,
    },
    {
      route: Routes.IAAS,
      index: 5,
    },
    {
      route: Routes.SETTINGS,
      index: 8,
    },
    {
      route: Routes.SETTINGS_COMPANY,
      index: 8,
    },
    {
      route: Routes.SETTINGS_SUBSCRIPTIONS,
      index: 8,
    },
    {
      route: Routes.SETTINGS_PASSWORD,
      index: 8,
    },
    {
      route: Routes.SETTINGS_MEMBERS,
      index: 8,
    },
    {
      route: Routes.SETTINGS_PROFILE,
      index: 8,
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
