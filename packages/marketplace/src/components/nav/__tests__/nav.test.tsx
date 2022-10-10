import React from 'react'
import { render } from '@testing-library/react'
import { Nav, getDefaultNavIndex } from '../nav'
import { Routes } from '../../../constants/routes'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'

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
})

describe('getDefaultNavIndex', () => {
  const routes = [
    {
      route: Routes.HOME,
      index: 1,
    },
    {
      route: Routes.APPS_BROWSE,
      index: 1,
    },
    {
      route: Routes.APPS_DETAIL,
      index: 1,
    },
    {
      route: Routes.APPS_INSTALLED,
      index: 2,
    },
    {
      route: Routes.SUPPORT,
      index: 4,
    },
    {
      route: Routes.SETTINGS_INSTALLED,
      index: 5,
    },
    {
      route: Routes.SETTINGS_PROFILE,
      index: 5,
    },
    {
      route: '/random-route',
      index: 0,
    },
  ]

  routes.forEach((route) => {
    it(`should correctly return the default nav index for ${route.route}`, () => {
      expect(getDefaultNavIndex(route.route)).toEqual(route.index)
    })
  })
})
