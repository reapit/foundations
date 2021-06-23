import React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { MARKETPLACE_DEV_URL, MARKETPLACE_PROD_URL } from '../../../core/constants'

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? MARKETPLACE_DEV_URL
      : MARKETPLACE_PROD_URL)

export const Nav: React.FC = () => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
  ]

  if (!connectIsDesktop) {
    navOptions.push(
      {
        itemIndex: 1,
        callback: callbackAppClick,
        iconId: 'apps',
        text: 'Apps',
      },
      {
        itemIndex: 2,
        callback: connectLogoutRedirect,
        isSecondary: true,
        iconId: 'logout',
        text: 'Logout',
      },
    )
  }

  return <NavResponsive options={navOptions} />
}

export default Nav
