import React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { MARKETPLACE_DEV_URL, MARKETPLACE_PROD_URL } from '../../../constants/constants'
import { isDemo } from '@reapit/utils'
import Routes from '../../../constants/routes'
import { History } from 'history'
import { useHistory } from 'react-router'

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? MARKETPLACE_DEV_URL
      : MARKETPLACE_PROD_URL)

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.PIPELINES:
    case Routes.PIPELINES_CREATION:
      return 1
    case Routes.API_KEYS:
      return 2
    case Routes.RELEASE_PROJECTS:
      return 3
    default:
      return 0
  }
}

export const navigate = (history: History, route: string) => (): void => {
  history.push(route)
}

export const Nav: React.FC = () => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const history = useHistory()
  const demoEnv = isDemo()
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      iconId: 'dataMenu',
      text: 'Pipelines',
      callback: navigate(history, Routes.PIPELINES),
    },
    {
      itemIndex: 2,
      iconId: 'apiMenu',
      text: 'API Keys',
      callback: navigate(history, Routes.API_KEYS),
    },
  ]

  if (!connectIsDesktop && !demoEnv) {
    navOptions.push(
      {
        itemIndex: 3,
        callback: callbackAppClick,
        iconId: 'appsMenu',
        text: 'Apps',
      },
      {
        itemIndex: 4,
        callback: connectLogoutRedirect,
        isSecondary: true,
        iconId: 'logoutMenu',
        text: 'Logout',
      },
    )
  }

  return <NavResponsive defaultNavIndex={getDefaultNavIndex(location.pathname)} options={navOptions} />
}

export default Nav
