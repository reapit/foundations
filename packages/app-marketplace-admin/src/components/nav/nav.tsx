import React, { FC } from 'react'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { Routes } from '../../constants/routes'
import { history } from '../../core/router'
import { navigate } from '../../utils/navigation'

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.HOME:
    case Routes.APPS_BROWSE_MANAGER:
      return 1
    default:
      return 0
  }
}

export const Nav: FC = () => {
  // const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
      callback: navigate(history, Routes.HOME),
    },
    {
      itemIndex: 1,
      text: 'Home',
      iconId: 'appsMenu',
      callback: navigate(history, Routes.APPS_BROWSE_MANAGER),
    },
  ]

  // if (!connectIsDesktop) {
  //   navOptions.splice(3, 0, {
  //     itemIndex: 3,
  //     callback: () => (window.location.href = window.reapit.config.developerPortalUrl),
  //     iconId: 'developersMenu',
  //     text: 'Developers',
  //   })
  // }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
