import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { Routes } from '../../constants/routes'
import { history } from '../../core/router'
import { navigate, navigateExternal } from '../../utils/navigation'

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes('apps')) return 1

  switch (pathname) {
    case Routes.HOME:
      return 1
    case Routes.APPS_INSTALLED:
      return 2
    case Routes.SUPPORT:
      return 4
    case Routes.SETTINGS_PROFILE:
    case Routes.SETTINGS_INSTALLED:
      return 5
    default:
      return 0
  }
}

export const Nav: FC = () => {
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
      callback: navigate(history, Routes.HOME),
    },
    {
      itemIndex: 1,
      text: 'Browse Apps',
      iconId: 'appsMenu',
      callback: navigate(history, Routes.APPS_BROWSE),
    },
    {
      itemIndex: 2,
      text: 'My Apps',
      iconId: 'installedMenu',
      callback: navigate(history, Routes.APPS_INSTALLED),
    },
    {
      itemIndex: 4,
      text: 'Support',
      iconId: 'supportMenu',
      isSecondary: true,
      callback: navigate(history, Routes.SUPPORT),
    },
    {
      itemIndex: 5,
      text: 'Settings',
      iconId: 'profileMenu',
      callback: navigate(history, Routes.SETTINGS_PROFILE),
      subItems: [
        {
          itemIndex: 1,
          callback: navigate(history, Routes.SETTINGS_PROFILE),
          text: 'Profile',
        },
        {
          itemIndex: 2,
          callback: navigate(history, Routes.SETTINGS_INSTALLED),
          text: 'Installed',
        },
      ],
    },
  ]

  if (!connectIsDesktop) {
    navOptions.splice(3, 0, {
      itemIndex: 3,
      callback: navigateExternal(window.reapit.config.developerPortalUrl),
      iconId: 'developersMenu',
      text: 'Developers',
    })
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
