import * as React from 'react'
import { useLocation } from 'react-router'
import {
  Menu as Sidebar,
  MenuConfig,
  SearchIcon,
  ReapitHouseIcon,
  ResultsIcon,
  AppsIcon,
  ProfileIcon,
  MenuItem,
} from '@reapit/elements-legacy'
import Routes from '@/constants/routes'
import { Location } from 'history'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { DEMO_STORAGE_KEY } from '../../constants/demo-storage'

export const generateMenuConfig = (logoutCallback: () => void, location: Location<any>): MenuConfig => {
  const isDemo = Boolean(window.sessionStorage.getItem(DEMO_STORAGE_KEY))
  return {
    defaultActiveKey: 'CLIENT_SEARCH',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitHouseIcon />,
        type: 'LOGO',
      },
      {
        title: 'Search',
        key: 'CLIENT_SEARCH',
        icon: <SearchIcon />,
        url: Routes.HOME,
        type: 'PRIMARY',
      },
      {
        title: 'Results',
        key: 'SEARCH_RESULTS',
        icon: <ResultsIcon />,
        url: Routes.RESULTS,
        type: 'PRIMARY',
      },
      !isDemo && {
        title: 'Apps',
        key: 'APPS',
        icon: <AppsIcon />,
        callback: () => (window.location.href = window.reapit.config.marketplaceUrl),
        type: 'PRIMARY',
      },
      !isDemo && {
        title: 'Logout',
        key: 'LOGOUT',
        callback: logoutCallback,
        icon: <ProfileIcon />,
        type: 'SECONDARY',
      },
    ].filter(Boolean) as MenuItem[],
  }
}

export const Menu: React.FC = () => {
  const location = useLocation()
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const menuConfigs = generateMenuConfig(() => connectLogoutRedirect(), location)
  const desktopOptimisedMenu = connectIsDesktop
    ? {
        ...menuConfigs,
        menu: menuConfigs.menu.filter((config) => config.key !== 'APPS' && config.key !== 'LOGOUT'),
      }
    : menuConfigs
  return <Sidebar {...desktopOptimisedMenu} location={location} />
}

export default Menu
