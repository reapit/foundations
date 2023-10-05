import React, { FC, MouseEvent } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../constants/routes'
import { navigateRoute } from '@reapit/payments-ui'
import { ORG_ADMIN_GROUP } from '../constants/permissions'
import { useNavigate } from 'react-router'

export const MARKETPLACE_DEV_URL = 'https://marketplace.dev.paas.reapit.cloud/installed'
export const MARKETPLACE_PROD_URL = 'https://marketplace.reapit.cloud/installed'

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? MARKETPLACE_DEV_URL
      : MARKETPLACE_PROD_URL)

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
