import React, { FC } from 'react'
import { useNavigate, useLocation } from 'react-router'
import Routes from '../../constants/routes'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { memo } from 'react'
import { navigateRoute } from '../../utils/navigation'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.APPROVALS:
      return 1
    case Routes.APPS:
      return 2
    case Routes.DEV_MANAGEMENT:
      return 3
    case Routes.INSTALLATIONS:
      return 4
    case Routes.BILLING:
      return 5
    case Routes.TRAFFIC:
      return 6
    case Routes.CUSTOMERS:
      return 7
    case Routes.SUBSCRIPTIONS:
      return 8
    case Routes.USAGE:
      return 9
    case Routes.IAAS:
      return 10
    case Routes.ROOT:
    default:
      return 0
  }
}

export const Menu: FC = () => {
  const location = useLocation()
  const { connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const navigate = useNavigate()
  const { pathname } = location

  const navOptions = [
    {
      itemIndex: 0,
      callback: navigateRoute(navigate, Routes.ROOT),
    },
    {
      itemIndex: 1,
      callback: navigateRoute(navigate, Routes.APPROVALS),
      text: 'Approvals',
    },
    {
      itemIndex: 2,
      callback: navigateRoute(navigate, Routes.APPS),
      text: 'Apps',
    },
    {
      itemIndex: 3,
      callback: navigateRoute(navigate, Routes.DEV_MANAGEMENT),
      text: 'Developers',
    },
    {
      itemIndex: 4,
      callback: navigateRoute(navigate, Routes.INSTALLATIONS),
      text: 'Installations',
    },
    {
      itemIndex: 5,
      callback: navigateRoute(navigate, Routes.BILLING),
      text: 'Billing',
    },
    {
      itemIndex: 6,
      callback: navigateRoute(navigate, Routes.TRAFFIC),
      text: 'Traffic',
    },
    {
      itemIndex: 7,
      callback: navigateRoute(navigate, Routes.CUSTOMERS),
      text: 'Customers',
    },
    {
      itemIndex: 8,
      callback: navigateRoute(navigate, Routes.SUBSCRIPTIONS),
      text: 'Subs',
    },
    {
      itemIndex: 9,
      callback: navigateRoute(navigate, Routes.USAGE),
      text: 'Usage',
    },
    {
      itemIndex: 10,
      callback: navigateRoute(navigate, Routes.IAAS),
      text: 'IAAS',
    },
    {
      itemIndex: 11,
      callback: connectLogoutRedirect,
      isSecondary: true,
      iconId: 'logoutMenu',
      text: 'Logout',
    },
  ]

  return <NavResponsive defaultNavIndex={getDefaultNavIndex(pathname)} options={navOptions as NavResponsiveOption[]} />
}

export default memo(Menu)
