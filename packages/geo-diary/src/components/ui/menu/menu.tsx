import React, { Dispatch, SetStateAction } from 'react'
import { useLocation } from 'react-router'
import {
  AppsIcon,
  DocsIcon,
  Menu as Sidebar,
  MenuConfig,
  ProfileIcon,
  ReapitHouseIcon,
  ResultsIcon,
} from '@reapit/elements'
import { Location } from 'history'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { AppState, AppTab, useAppState } from '../../../core/app-state'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  setAppState: Dispatch<SetStateAction<AppState>>,
  appState: AppState,
): MenuConfig => {
  return {
    defaultActiveKey: 'DIARY',
    currentActiveKey: appState.tab === 'LIST' ? 'DIARY' : 'MAP',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitHouseIcon />,
        type: 'LOGO',
      },
      {
        title: 'Diary',
        key: 'DIARY',
        icon: <DocsIcon />,
        callback: changeTabCallback(setAppState, 'LIST'),
        type: 'PRIMARY',
      },
      {
        title: 'Map',
        key: 'MAP',
        icon: <ResultsIcon />,
        callback: changeTabCallback(setAppState, 'MAP'),
        type: 'PRIMARY',
      },
      {
        title: 'Apps',
        key: 'APPS',
        icon: <AppsIcon />,
        callback: callbackAppClick,
        type: 'PRIMARY',
      },
      {
        title: 'Logout',
        key: 'LOGOUT',
        callback: logoutCallback,
        icon: <ProfileIcon />,
        type: 'SECONDARY',
      },
    ],
  }
}

export const changeTabCallback = (setAppState: Dispatch<SetStateAction<AppState>>, tab: AppTab) => () => {
  setAppState((currentState) => ({
    ...currentState,
    tab,
  }))
}

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? 'https://marketplace.dev.paas.reapit.cloud/installed'
      : 'https://marketplace.reapit.cloud/installed')

export type MenuProps = {}

export const Menu: React.FC<MenuProps> = () => {
  const location = useLocation()
  const { setAppState, appState } = useAppState()
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const menuConfigs = generateMenuConfig(() => connectLogoutRedirect(), location, setAppState, appState)
  const desktopOptimisedMenu = connectIsDesktop
    ? {
        ...menuConfigs,
        menu: menuConfigs.menu.filter((config) => config.key !== 'APPS' && config.key !== 'LOGOUT'),
      }
    : menuConfigs
  return <Sidebar {...desktopOptimisedMenu} location={location} />
}

export default Menu
