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
} from '@reapit/elements'
import Routes from '@/constants/routes'
import { Location } from 'history'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const generateMenuConfig = (logoutCallback: () => void, location: Location<any>): MenuConfig => {
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
      {
        title: 'Apps',
        key: 'APPS',
        icon: <AppsIcon />,
        callback: () => (window.location.href = window.reapit.config.marketplaceUrl),
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
