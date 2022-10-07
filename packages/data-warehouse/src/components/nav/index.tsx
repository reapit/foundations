import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import Routes from '../../constants/routes'
import { History } from 'history'
import { useHistory, useLocation } from 'react-router'

export const callbackAppClick = () => (window.location.href = window.reapit.config.marketplaceUrl)

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.HOME:
      return 0
    case Routes.ACCOUNTS:
      return 1
    case Routes.DATA:
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
  const history = useHistory()
  const location = useLocation()

  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      callback: navigate(history, Routes.ACCOUNTS),
      iconId: 'usersMenu',
      text: 'Users',
    },
    {
      itemIndex: 2,
      callback: navigate(history, Routes.DATA),
      iconId: 'dataMenu',
      text: 'Data',
    },
  ]

  if (!connectIsDesktop) {
    navOptions.push(
      {
        itemIndex: 3,
        callback: callbackAppClick,
        iconId: 'appsMenu',
        text: 'Apps',
      },
      {
        itemIndex: 4,
        callback: connectLogoutRedirect,
        isSecondary: true,
        iconId: 'logoutMenu',
        text: 'Logout',
      },
    )
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(location.pathname)} />
}

export default Nav
