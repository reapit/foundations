import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../../constants/routes'
import { navigateRoute } from '../../utils/navigation'
import { useNavigate } from 'react-router'
import { getIsAdmin } from '../../utils/is-admin'

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case RoutePaths.USERS:
      return 1
    case RoutePaths.ORGS:
      return 2
    default:
      return 0
  }
}

export const Nav: FC = () => {
  const navigate = useNavigate()
  const { connectLogoutRedirect, connectIsDesktop, connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { isFoundationsAdmin } = getIsAdmin(connectSession)

  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Users',
      iconId: 'usersMenu',
      callback: navigateRoute(navigate, RoutePaths.USERS),
    },
  ]

  if (isFoundationsAdmin) {
    navOptions.push({
      itemIndex: 2,
      text: 'Orgs',
      iconId: 'officesMenu',
      callback: navigateRoute(navigate, RoutePaths.ORGS),
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
