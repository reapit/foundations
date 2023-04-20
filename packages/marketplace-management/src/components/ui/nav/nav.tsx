import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import Routes from '../../../constants/routes'
import { NavigateFunction, useNavigate } from 'react-router'

export const MARKETPLACE_DEV_URL = 'https://marketplace.dev.paas.reapit.cloud/installed'
export const MARKETPLACE_PROD_URL = 'https://marketplace.reapit.cloud/installed'

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? MARKETPLACE_DEV_URL
      : MARKETPLACE_PROD_URL)

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes(Routes.MARKETPLACE)) return 3
  switch (pathname) {
    case Routes.OFFICES:
    case Routes.OFFICES_GROUPS:
      return 1
    case Routes.USERS:
    case Routes.USERS_GROUPS:
      return 2
    default:
      return 0
  }
}

export const navigateRoute = (navigate: NavigateFunction, route: string) => (): void => {
  navigate(route)
}

export const Nav: FC = () => {
  const navigate = useNavigate()
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Offices',
      iconId: 'officesMenu',
      callback: navigateRoute(navigate, Routes.OFFICES),
      subItems: [
        {
          itemIndex: 0,
          callback: navigateRoute(navigate, Routes.OFFICES),
          text: 'Offices',
        },
        {
          itemIndex: 1,
          callback: navigateRoute(navigate, Routes.OFFICES_GROUPS),
          text: 'Offices Groups',
        },
      ],
    },
    {
      itemIndex: 2,
      text: 'Users',
      iconId: 'usersMenu',
      callback: navigateRoute(navigate, Routes.USERS),
      subItems: [
        {
          itemIndex: 2,
          callback: navigateRoute(navigate, Routes.USERS),
          text: 'Users',
        },
        {
          itemIndex: 3,
          callback: navigateRoute(navigate, Routes.USERS_GROUPS),
          text: 'Users Groups',
        },
      ],
    },
    {
      itemIndex: 3,
      text: 'AppMarket',
      iconId: 'marketplaceMenu',
      callback: navigateRoute(navigate, Routes.MARKETPLACE),
    },
  ]

  if (!connectIsDesktop) {
    navOptions.push(
      {
        itemIndex: 4,
        callback: callbackAppClick,
        iconId: 'appsMenu',
        text: 'Apps',
      },
      {
        itemIndex: 5,
        callback: connectLogoutRedirect,
        isSecondary: true,
        iconId: 'logoutMenu',
        text: 'Logout',
      },
    )
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
