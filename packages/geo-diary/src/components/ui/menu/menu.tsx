import React, { Dispatch, SetStateAction } from 'react'
import { useLocation } from 'react-router'
import {
  AppsIcon,
  DocsIcon,
  isMobile,
  Menu as Sidebar,
  MenuConfig,
  ProfileIcon,
  ReapitHouseIcon,
  MapIcon,
} from '@reapit/elements'
import { Location } from 'history'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { AppState, AppTab, useAppState } from '../../../core/app-state'
import { MenuWrap } from './__styles__/styles'
import { handlePwaNavigate, usePwaNavigate } from '../../../utils/pwa-navigate'

const marketplaceUrl =
  window.location.href.includes('dev') || window.location.href.includes('localhost')
    ? 'https://marketplace.dev.paas.reapit.cloud/installed'
    : 'https://marketplace.reapit.cloud/installed'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  setAppState: Dispatch<SetStateAction<AppState>>,
  setPwaNavState: Dispatch<SetStateAction<string | null>>,
  appState: AppState,
  isMobileView: boolean,
): MenuConfig => {
  const config = {
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
        title: 'Apps',
        key: 'APPS',
        icon: <AppsIcon />,
        callback: handlePwaNavigate(setPwaNavState, marketplaceUrl),
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

  const mapItem = {
    title: 'Map',
    key: 'MAP',
    icon: <MapIcon />,
    callback: changeTabCallback(setAppState, 'MAP'),
    type: 'PRIMARY',
  }

  if (isMobileView) {
    config.menu.splice(2, 0, mapItem)
  }

  return config as MenuConfig
}

export const changeTabCallback = (setAppState: Dispatch<SetStateAction<AppState>>, tab: AppTab) => () => {
  setAppState((currentState) => ({
    ...currentState,
    tab,
  }))
}

export type MenuProps = {}

export const Menu: React.FC<MenuProps> = () => {
  const location = useLocation()
  const { setAppState, appState } = useAppState()
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const { setPwaNavState } = usePwaNavigate()
  const isMobileView = isMobile()
  const menuConfigs = generateMenuConfig(
    () => connectLogoutRedirect(),
    location,
    setAppState,
    setPwaNavState,
    appState,
    isMobileView,
  )
  const desktopOptimisedMenu = connectIsDesktop
    ? {
        ...menuConfigs,
        menu: menuConfigs.menu.filter((config) => config.key !== 'APPS' && config.key !== 'LOGOUT'),
      }
    : menuConfigs
  return (
    <MenuWrap>
      <Sidebar {...desktopOptimisedMenu} location={location} />
    </MenuWrap>
  )
}

export default Menu
