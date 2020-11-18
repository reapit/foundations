import * as React from 'react'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { Location } from 'history'
import { FaSignOutAlt, FaCloud } from 'react-icons/fa'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const generateMenuConfig = (logoutCallback: () => void, location: Location<any>): MenuConfig => {
  return {
    defaultActiveKey: 'APPS',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO',
      },
      {
        title: 'Apps',
        key: 'APPS',
        icon: <FaCloud className="nav-item-icon" />,
        callback: callbackAppClick,
        type: 'PRIMARY',
      },
      {
        title: 'Logout',
        key: 'LOGOUT',
        callback: logoutCallback,
        icon: <FaSignOutAlt className="nav-item-icon" />,
        type: 'SECONDARY',
      },
    ],
  }
}

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? 'https://marketplace.dev.paas.reapit.cloud/installed'
      : 'https://marketplace.reapit.cloud/installed')

export type MenuProps = {}

export const Menu: React.FC<MenuProps> = () => {
  const location = useLocation()
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const menuConfigs = generateMenuConfig(() => connectLogoutRedirect(), location)
  const desktopOptimisedMenu = connectIsDesktop
    ? {
        ...menuConfigs,
        menu: menuConfigs.menu.filter(config => config.key !== 'APPS' && config.key !== 'LOGOUT'),
      }
    : menuConfigs
  return <Sidebar {...desktopOptimisedMenu} location={location} />
}

export default Menu
