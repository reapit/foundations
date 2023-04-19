import React, { FC } from 'react'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../../constants/routes'
import { navigateRoute } from '../../utils/navigation'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useNavigate } from 'react-router'

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case RoutePaths.HOME:
    case RoutePaths.APPS_BROWSE_MANAGER:
      return 1
    default:
      return 0
  }
}

export const Nav: FC = () => {
  const navigate = useNavigate()
  const { connectIsDesktop, connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
      callback: navigateRoute(navigate, RoutePaths.HOME),
    },
    {
      itemIndex: 1,
      text: 'Home',
      iconId: 'appsMenu',
      callback: navigateRoute(navigate, RoutePaths.APPS_BROWSE_MANAGER),
    },
  ]

  if (!connectIsDesktop) {
    navOptions.push({
      itemIndex: 5,
      callback: connectLogoutRedirect,
      isSecondary: true,
      iconId: 'logoutMenu',
      text: 'Logout',
    })
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
