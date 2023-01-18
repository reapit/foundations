import React from 'react'
import { render } from '@testing-library/react'
import { Nav, callbackAppClick, getDefaultNavIndex, openNewPage } from '../nav'
import { Routes } from '../../constants/routes'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectIsDesktop: false,
    connectSession: jest.fn(),
  }),
}))

describe('Nav', () => {
  it('should match a snapshot', () => {
    window.location.pathname = '/'
    const wrapper = render(
      <NavStateProvider>
        <MediaStateProvider>
          <Nav />
        </MediaStateProvider>
      </NavStateProvider>,
    )
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
        route: Routes.PAYMENTS,
        index: 1,
      },
      {
        route: Routes.PAYMENT,
        index: 1,
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
