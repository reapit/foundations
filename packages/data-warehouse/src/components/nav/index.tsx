import React, { FC, MouseEvent } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import Routes from '../../constants/routes'
import { NavigateFunction, useLocation, useNavigate } from 'react-router'

export const callbackAppClick = () => (window.location.href = process.env.marketplaceUrl)

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.HOME:
      return 0
    case Routes.ACCOUNTS:
      return 1
    case Routes.DATA:
      return 2
    default:
      return 0
  }
}

export const navigateRoute = (navigate: NavigateFunction, route: string) => (): void => {
  navigate(route)
}

export const openNewPage = (uri: string) => (event?: MouseEvent) => {
  event?.preventDefault()
  event?.stopPropagation()
  window.open(uri, '_blank', 'noopener noreferrer')
}

export const Nav: FC = () => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navigate = useNavigate()
  const location = useLocation()

  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      callback: navigateRoute(navigate, Routes.ACCOUNTS),
      text: 'Users',
    },
    {
      itemIndex: 2,
      callback: navigateRoute(navigate, Routes.DATA),
      text: 'Data',
    },
  ]

  if (!connectIsDesktop) {
    navOptions.push({
      itemIndex: 4,
      callback: connectLogoutRedirect,
      isSecondary: true,
      iconId: 'logoutMenu',
      text: 'Logout',
    })
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(location.pathname)} />
}

export default Nav
