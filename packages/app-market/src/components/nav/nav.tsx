import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { Routes } from '../../constants/routes'
import { history } from '../../core/router'
import { navigate } from '../../utils/navigation'

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.HOME:
    case Routes.APPS_BROWSE:
    case Routes.APPS_DETAIL:
      return 1
    case Routes.APPS_INSTALLED:
      return 2
    case Routes.SETTINGS_PROFILE:
    case Routes.SETTINGS_INSTALLED:
      return 4
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
      text: 'Home',
      iconId: 'appsMenu',
      callback: navigate(history, Routes.APPS_BROWSE),
    },
    {
      itemIndex: 2,
      text: 'Installed',
      iconId: 'installedMenu',
      callback: navigate(history, Routes.APPS_INSTALLED),
    },
    {
      itemIndex: 4,
      text: 'Settings',
      iconId: 'profileMenu',
      isSecondary: true,
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
      callback: () => (window.location.href = window.reapit.config.developerPortalUrl),
      iconId: 'developersMenu',
      text: 'Developers',
    })
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
