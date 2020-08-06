import * as React from 'react'
import Routes from '@/constants/routes'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { Location } from 'history'
import { IoIosPeople } from 'react-icons/io'
import { FaSignOutAlt, FaCloud, FaQuestion, FaBuilding } from 'react-icons/fa'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const generateMenuConfig = (logout: () => void, location: Location<any>): MenuConfig => {
  return {
    defaultActiveKey: 'LOGO',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO',
      },
      {
        title: 'Offices',
        key: 'OFFICES',
        icon: <FaBuilding className="nav-item-icon" />,
        url: Routes.OFFICES,
        type: 'PRIMARY',
      },
      {
        title: 'Users',
        key: 'USERS',
        icon: <IoIosPeople className="nav-item-icon" />,
        url: Routes.USERS,
        type: 'PRIMARY',
      },
      {
        title: 'Apps',
        key: 'APPS',
        icon: <FaCloud className="nav-item-icon" />,
        callback: callbackAppClick,
        type: 'PRIMARY',
      },
      {
        title: 'Help',
        key: 'HELP',
        icon: <FaQuestion className="nav-item-icon" />,
        url: Routes.HELP,
        type: 'PRIMARY',
      },

      {
        title: 'Logout',
        key: 'LOGOUT',
        callback: logout.bind(null),
        icon: <FaSignOutAlt className="nav-item-icon" />,
        type: 'SECONDARY',
      },
    ],
  }
}

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? 'https://dev.marketplace.reapit.cloud/client/installed'
      : 'https://marketplace.reapit.cloud/client/installed')

export type MenuProps = {}

export const handleLogout = () => {
  reapitConnectBrowserSession.connectLogoutRedirect()
}

export const Menu: React.FC<MenuProps> = () => {
  const location = useLocation()

  const menuConfigs = generateMenuConfig(handleLogout, location)
  return <Sidebar {...menuConfigs} location={location} />
}

export default Menu
