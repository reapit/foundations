import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../../constants/routes'
import { navigateRoute, openNewPage } from '../../utils/navigation'
import { useNavigate } from 'react-router'
import { getIsAdmin } from '../../utils/is-admin'
import { getAvatarInitials } from '@reapit/utils-react'

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
      callback: navigateRoute(navigate, RoutePaths.USERS),
    },
  ]

  if (isFoundationsAdmin) {
    navOptions.push({
      itemIndex: 2,
      text: 'Orgs',
      callback: navigateRoute(navigate, RoutePaths.ORGS),
    })
  }

  return (
    <NavResponsive
      options={navOptions}
      defaultNavIndex={getDefaultNavIndex(window.location.pathname)}
      appSwitcherOptions={[
        {
          text: 'AppMarket',
          callback: openNewPage('https://marketplace.reapit.cloud'),
          iconUrl: <Icon icon="reapitLogoSmallInfographic" />,
        },
        {
          text: 'DevPortal',
          callback: openNewPage('https://developers.reapit.cloud'),
          iconUrl: <Icon icon="reapitLogoSmallInfographic" />,
        },
      ]}
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
