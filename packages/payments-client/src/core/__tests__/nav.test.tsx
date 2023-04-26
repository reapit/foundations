import React from 'react'
import { Nav, callbackAppClick, getDefaultNavIndex, openNewPage } from '../nav'
import { RoutePaths } from '../../constants/routes'
import { render } from '../../tests/react-testing'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectIsDesktop: false,
    connectSession: jest.fn(() => ({
      loginIdentity: {
        groups: ['OrganisationAdmin'],
      },
    })),
  }),
}))

describe('Nav', () => {
  it('should match a snapshot', () => {
    window.location.pathname = '/'
    const wrapper = render(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('openNewPage', () => {
    it('should open a new page', () => {
      const openSpy = jest.spyOn(window, 'open')
      const curried = openNewPage('https://example.com')
      curried()

      expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank')
    })
  })

  describe('callbackAppClick', () => {
    it('should run correcly', () => {
      const fn = callbackAppClick()
      expect(fn).toEqual('https://marketplace.reapit.cloud/installed')
    })
  })

  describe('getDefaultNavIndex', () => {
    const routes = [
      {
        route: RoutePaths.PAYMENTS,
        index: 1,
      },
      {
        route: RoutePaths.PAYMENT,
        index: 1,
      },
      {
        route: RoutePaths.ADMIN,
        index: 2,
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
})
