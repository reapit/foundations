import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import Routes from '../../../constants/routes'
import { NavigateFunction, useNavigate } from 'react-router'
import { getAvatarInitials } from '@reapit/utils-react'

export const openNewPage = (uri: string) => (event?: MouseEvent) => {
  event?.preventDefault()
  event?.stopPropagation()
  window.open(uri, '_blank', 'noopener noreferrer')
}

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes(Routes.MARKETPLACE)) return 3
  switch (pathname) {
    case Routes.OFFICES:
    case Routes.OFFICES_GROUPS:
      return 1
    case Routes.USERS:
    case Routes.USERS_GROUPS:
      return 2
    default:
      return 0
  }
}

export const navigateRoute = (navigate: NavigateFunction, route: string) => (): void => {
  navigate(route)
}

export const Nav: FC = () => {
  const navigate = useNavigate()
  const { connectLogoutRedirect, connectIsDesktop, connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Offices',
      callback: navigateRoute(navigate, Routes.OFFICES),
      subItems: [
        {
          itemIndex: 0,
          callback: navigateRoute(navigate, Routes.OFFICES),
          text: 'Offices',
        },
        {
          itemIndex: 1,
          callback: navigateRoute(navigate, Routes.OFFICES_GROUPS),
          text: 'Offices Groups',
        },
      ],
    },
    {
      itemIndex: 2,
      text: 'Users',
      callback: navigateRoute(navigate, Routes.USERS),
      subItems: [
        {
          itemIndex: 2,
          callback: navigateRoute(navigate, Routes.USERS),
          text: 'Users',
        },
        {
          itemIndex: 3,
          callback: navigateRoute(navigate, Routes.USERS_GROUPS),
          text: 'Users Groups',
        },
      ],
    },
    {
      itemIndex: 3,
      text: 'AppMarket',
      callback: navigateRoute(navigate, Routes.MARKETPLACE),
    },
  ]

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
