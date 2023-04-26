import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../../constants/routes'
import { navigateRoute } from '../../utils/navigation'
import { getIsAdmin } from '../../utils/is-admin'
import { useNavigate } from 'react-router'

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case RoutePaths.HOME:
      return 1
    case RoutePaths.ADMIN:
      return 2
    default:
      return 0
  }
}

export const Nav: FC = () => {
  const navigate = useNavigate()
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
      callback: navigateRoute(navigate, RoutePaths.HOME),
    },
  ]

  if (isAdmin) {
    navOptions.push({
      itemIndex: 2,
      text: 'Admin',
      iconId: 'manageMenu',
      callback: navigateRoute(navigate, RoutePaths.ADMIN),
    })
  }

  if (!connectIsDesktop) {
    navOptions.push({
      itemIndex: 4,
      callback: connectLogoutRedirect,
      isSecondary: true,
      iconId: 'logoutMenu',
      text: 'Logout',
    })
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
