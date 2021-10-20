import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import Routes from '../../../constants/routes'
import { History } from 'history'
import { history } from '../../../core/router'

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
    case Routes.MARKETPLACE:
      return 3
    default:
      return 0
  }
}

export const navigate = (history: History, route: string) => (): void => {
  history.push(route)
}

export const Nav: FC = () => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Offices',
      iconId: 'officesMenu',
      callback: navigate(history, Routes.OFFICES),
    },
    {
      itemIndex: 2,
      text: 'Users',
      iconId: 'usersMenu',
      callback: navigate(history, Routes.USERS),
    },
    {
      itemIndex: 3,
      text: 'AppMarket',
      iconId: 'marketplaceMenu',
      callback: navigate(history, Routes.MARKETPLACE),
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
