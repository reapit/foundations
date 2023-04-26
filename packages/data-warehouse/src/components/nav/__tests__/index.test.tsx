import React from 'react'
import { render } from '../../../tests/react-testing'
import { Nav, callbackAppClick, getDefaultNavIndex } from '..'
import Routes from '../../../constants/routes'

describe('Nav', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('callbackAppClick', () => {
  it('should correctly navigate to marketplace', () => {
    const marketplaceUri = 'https://marketplace.reapit.cloud/installed'
    process.env.marketplaceUrl = 'https://marketplace.reapit.cloud/installed'
    callbackAppClick()
    expect(window.location.href).toEqual(marketplaceUri)
  })
})

describe('getDefaultNavIndex', () => {
  const routes = [
    {
      route: Routes.HOME,
      index: 0,
    },
    {
      route: Routes.ACCOUNTS,
      index: 1,
    },
    {
      route: Routes.DATA,
      index: 2,
    },
    {
      route: '/random',
      index: 0,
    },
  ]

  routes.forEach((route) => {
    it(`should correctly return the default nav index for ${route.route}`, () => {
      expect(getDefaultNavIndex(route.route)).toEqual(route.index)
    })
  })
})
