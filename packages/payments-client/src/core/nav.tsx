import React, { FC, MouseEvent } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../constants/routes'
import { navigateRoute } from '@reapit/payments-ui'
import { ORG_ADMIN_GROUP } from '../constants/permissions'
import { useNavigate } from 'react-router'
import { getAvatarInitials } from '@reapit/utils-react'

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes(RoutePaths.PAYMENTS)) return 1
  if (pathname.includes(RoutePaths.ADMIN)) return 2
  return 0
}

export const openNewPage = (uri: string) => (event?: MouseEvent<HTMLElement>) => {
  event?.preventDefault()
  event?.stopPropagation()
  window.open(uri, '_blank')
}

export const Nav: FC = () => {
  const navigate = useNavigate()
  const { connectSession, connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const isAdmin = connectSession?.loginIdentity?.groups?.includes(ORG_ADMIN_GROUP)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Payments',
      callback: navigateRoute(navigate, RoutePaths.PAYMENTS),
    },
  ]

  if (isAdmin) {
    navOptions.push({
      itemIndex: 2,
      callback: navigateRoute(navigate, RoutePaths.ADMIN),
      text: 'Admin',
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
          iconUrl: <Icon icon="reapitLogoSmall" />,
        },
        {
          text: 'DevPortal',
          callback: openNewPage('https://developers.reapit.cloud'),
          iconUrl: <Icon icon="reapitLogoSmall" />,
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
