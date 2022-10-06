import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import Routes from '../../constants/routes'

export const callbackAppClick = () => (window.location.href = window.reapit.config.marketplaceUrl)

export const Nav: FC = () => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      href: Routes.ACCOUNTS,
      iconId: 'usersMenu',
      text: 'Users',
    },
    {
      itemIndex: 1,
      href: Routes.DATA,
      iconId: 'dataMenu',
      text: 'Data',
    },
  ]

  if (!connectIsDesktop) {
    navOptions.push(
      {
        itemIndex: 2,
        callback: callbackAppClick,
        iconId: 'appsMenu',
        text: 'Apps',
      },
      {
        itemIndex: 3,
        callback: connectLogoutRedirect,
        isSecondary: true,
        iconId: 'logoutMenu',
        text: 'Logout',
      },
    )
  }

  return <NavResponsive options={navOptions} />
}

export default Nav
