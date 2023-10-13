import * as React from 'react'
import { Nav, navigateRoute, getDefaultNavIndex } from '../nav'
import Routes from '../../../../constants/routes'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'
import { render } from '../../../../tests/react-testing'

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

  describe('navigate', () => {
    it('should open a new page', () => {
      const navigate = jest.fn()
      const curried = navigateRoute(navigate, Routes.USERS)
      curried()

      expect(navigate).toHaveBeenCalledWith(Routes.USERS)
    })
  })

  describe('getDefaultNavIndex', () => {
    const routes = [
      {
        route: Routes.OFFICES,
        index: 1,
      },
      {
        route: Routes.OFFICES_GROUPS,
        index: 1,
      },
      {
        route: Routes.USERS,
        index: 2,
      },
      {
        route: Routes.USERS_GROUPS,
        index: 2,
      },
      {
        route: Routes.MARKETPLACE,
        index: 3,
      },
      {
        route: Routes.MARKETPLACE_APP,
        index: 3,
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
