import React, { FC } from 'react'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../../constants/routes'
import { navigateRoute, openNewPage } from '../../utils/navigation'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useNavigate } from 'react-router'
import { getAvatarInitials } from '@reapit/utils-react'

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
  const { connectSession, connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
      callback: navigateRoute(navigate, RoutePaths.HOME),
    },
    {
      itemIndex: 1,
      text: 'Home',
      callback: navigateRoute(navigate, RoutePaths.APPS_BROWSE_MANAGER),
    },
  ]

  return (
    <NavResponsive
      options={navOptions}
      defaultNavIndex={getDefaultNavIndex(window.location.pathname)}
      appSwitcherOptions={[
        {
          text: 'AppMarket',
          callback: openNewPage(process.env.marketplaceUrl),
          iconUrl: <Icon icon="reapitLogoSmallInfographic" />,
        },
        {
          text: 'DevPortal',
          callback: openNewPage(process.env.developerPortalUrl),
          iconUrl: <Icon icon="reapitLogoSmallInfographic" />,
        },
      ]}
      avatarText={getAvatarInitials(connectSession)}
      avatarOptions={[
        {
          callback: connectLogoutRedirect,
          text: 'Logout',
        },
      ]}
    />
  )
}

export default Nav
