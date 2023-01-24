import React, { FC, MouseEvent } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { Routes } from '../constants/routes'
import { history } from './router'
import { navigate } from '@reapit/payments-ui'

export const MARKETPLACE_DEV_URL = 'https://marketplace.dev.paas.reapit.cloud/installed'
export const MARKETPLACE_PROD_URL = 'https://marketplace.reapit.cloud/installed'

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? MARKETPLACE_DEV_URL
      : MARKETPLACE_PROD_URL)

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes(Routes.PAYMENTS)) return 1
  return 0
}

export const openNewPage = (uri: string) => (event?: MouseEvent<HTMLElement>) => {
  event?.preventDefault()
  event?.stopPropagation()
  window.open(uri, '_blank')
}

export const Nav: FC = () => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Payments',
      iconId: 'paymentsMenu',
      callback: navigate(history, Routes.PAYMENTS),
    },
  ]

  if (!connectIsDesktop) {
    navOptions.push(
      {
        itemIndex: 4,
        callback: callbackAppClick,
        iconId: 'appsMenu',
        text: 'Apps',
      },
      {
        itemIndex: 5,
        callback: connectLogoutRedirect,
        isSecondary: true,
        iconId: 'logoutMenu',
        text: 'Logout',
      },
    )
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
