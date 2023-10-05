import React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { MARKETPLACE_DEV_URL, MARKETPLACE_PROD_URL } from '../../../core/constants'
import { isDemo } from '@reapit/utils-react'

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? MARKETPLACE_DEV_URL
      : MARKETPLACE_PROD_URL)

export const Nav: React.FC = () => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const demoEnv = isDemo()
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
  ]

  if (!connectIsDesktop && !demoEnv) {
    navOptions.push({
      itemIndex: 2,
      callback: connectLogoutRedirect,
      isSecondary: true,
      iconId: 'logoutMenu',
      text: 'Logout',
    })
  }

  return <NavResponsive options={navOptions} />
}

export default Nav
