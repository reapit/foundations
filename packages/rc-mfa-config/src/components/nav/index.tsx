import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../../constants/routes'
import { navigateRoute, openNewPage } from '../../utils/navigation'
import { getIsAdmin } from '../../utils/is-admin'
import { useNavigate } from 'react-router'
import { getAvatarInitials } from '@reapit/utils-react'

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
  const isUkProduct = connectSession?.loginIdentity.orgProduct === 'agencyCloud'

  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Configure',
      callback: navigateRoute(navigate, RoutePaths.HOME),
    },
  ]

  if (isAdmin) {
    navOptions.push({
      itemIndex: 2,
      text: 'Admin',
      callback: navigateRoute(navigate, RoutePaths.ADMIN),
    })
  }

  return (
    <NavResponsive
      options={navOptions}
      defaultNavIndex={getDefaultNavIndex(window.location.pathname)}
      appSwitcherOptions={
        isUkProduct
          ? [
              {
                text: 'AppMarket',
                callback: openNewPage('https://marketplace.reapit.cloud'),
                iconUrl: <Icon icon="reapitLogoSmall" />,
              },
              {
                text: 'DevPortal',
                callback: openNewPage('https://developers.reapit.cloud'),
                iconUrl: <Icon icon="reapitLogoSmall" />,
              },
            ]
          : undefined
      }
      avatarText={getAvatarInitials(connectSession)}
      avatarOptions={
        !connectIsDesktop
          ? [
              {
                callback: connectLogoutRedirect,
                text: 'Logout',
              },
            ]
          : undefined
      }
    />
  )
}

export default Nav
