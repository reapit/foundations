import React from 'react'
import { getDefaultNavIndex, Menu } from '../menu'
import Routes from '../../../constants/routes'
import { render } from '../../../tests/react-testing'

describe('Menu', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match a snapshot', () => {
    expect(render(<Menu />)).toMatchSnapshot()
  })
})

describe('getDefaultNavIndex', () => {
  const routes = [
    {
      route: Routes.ROOT,
      index: 0,
    },
    {
      route: Routes.APPROVALS,
      index: 1,
    },
    {
      route: Routes.APPS,
      index: 2,
    },
    {
      route: Routes.DEV_MANAGEMENT,
      index: 3,
    },
    {
      route: Routes.INSTALLATIONS,
      index: 4,
    },
    {
      route: Routes.BILLING,
      index: 5,
    },
    {
      route: Routes.CUSTOMERS,
      index: 6,
    },
    {
      route: Routes.SUBSCRIPTIONS,
      index: 7,
    },
    {
      route: Routes.USAGE,
      index: 8,
    },
  ]

  routes.forEach((route) => {
    it(`should correctly return the default nav index for ${route.route}`, () => {
      expect(getDefaultNavIndex(route.route)).toEqual(route.index)
    })
  })
})
