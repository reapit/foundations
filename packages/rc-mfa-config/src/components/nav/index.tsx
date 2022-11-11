import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { Routes } from '../../constants/routes'
import { history } from '../../core/router'
import { navigate } from '../../utils/navigation'
import { getIsAdmin } from '../../utils/is-admin'

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.HOME:
      return 1
    case Routes.ADMIN:
      return 2
    default:
      return 0
  }
}

export const Nav: FC = () => {
  const { connectLogoutRedirect, connectIsDesktop, connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isAdmin = getIsAdmin(connectSession)

  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Configure',
      iconId: 'myAccountMenu',
      callback: navigate(history, Routes.HOME),
    },
  ]

  if (isAdmin) {
    navOptions.push({
      itemIndex: 2,
      text: 'Admin',
      iconId: 'manageMenu',
      callback: navigate(history, Routes.ADMIN),
    })
  }

  if (!connectIsDesktop) {
    navOptions.push(
      {
        itemIndex: 3,
        callback: () => (window.location.href = window.reapit.config.marketplaceUrl),
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

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
