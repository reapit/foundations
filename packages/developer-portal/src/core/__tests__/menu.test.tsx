import React from 'react'
import { getDefaultNavIndex, Menu } from '../menu'
import Routes from '../../constants/routes'
import { render } from '../../tests/react-testing'

jest.mock('uuid', () => ({
  validate: jest.fn(() => true),
}))

jest.mock('../use-global-state')

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
      index: 8,
    },
    {
      route: Routes.ANALYTICS_API_CALLS,
      index: 8,
    },
    {
      route: Routes.ANALYTICS_INSTALLATIONS,
      index: 8,
    },
    {
      route: Routes.ANALYTICS_COST_CALCULATOR,
      index: 8,
    },
    {
      route: Routes.SWAGGER,
      index: 13,
    },
    {
      route: Routes.GRAPHQL,
      index: 13,
    },
    {
      route: Routes.WEBHOOKS_ABOUT,
      index: 13,
    },
    {
      route: Routes.WEBHOOKS_NEW,
      index: 13,
    },
    {
      route: Routes.WEBHOOKS_MANAGE,
      index: 13,
    },
    {
      route: Routes.WEBHOOKS_LOGS,
      index: 13,
    },
    {
      route: Routes.DESKTOP,
      index: 13,
    },
    {
      route: Routes.ELEMENTS,
      index: 18,
    },
    {
      route: Routes.API_DOCS,
      index: 20,
    },
    {
      route: Routes.ANALYTICS_SCHEMA_DOCS,
      index: 20,
    },
    {
      route: Routes.IAAS,
      index: 19,
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
