import * as React from 'react'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import Routes from '../../constants/routes'
import { Location } from 'history'
import { FaCloud, FaReadme, FaCog, FaChartBar, FaBolt, FaDesktop } from 'react-icons/fa'
import { MdHelp } from 'react-icons/md'
import { GoDatabase } from 'react-icons/go'

export const generateMenuConfig = (location: Location<any>): MenuConfig => {
  return {
    defaultActiveKey: 'MANAGE_APPS',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO',
      },
      {
        title: 'Apps',
        key: 'MANAGE_APPS',
        url: Routes.APPS,
        type: 'PRIMARY',
        icon: <FaCloud className="nav-item-icon" />,
      },
      {
        title: 'Analytics',
        key: 'ANALYTICS',
        url: Routes.ANALYTICS,
        type: 'PRIMARY',
        icon: <FaChartBar className="nav-item-icon" />,
      },
      {
        title: 'API',
        key: 'SWAGGER',
        url: Routes.SWAGGER,
        type: 'PRIMARY',
        icon: <GoDatabase className="nav-item-icon" />,
      },
      {
        title: 'Webhooks',
        key: 'WEBHOOKS',
        url: Routes.WEBHOOKS,
        type: 'PRIMARY',
        icon: <FaBolt className="nav-item-icon" />,
      },
      {
        title: 'Docs',
        key: 'API_DOCS',
        url: Routes.API_DOCS,
        type: 'PRIMARY',
        icon: <FaReadme className="nav-item-icon" />,
      },
      {
        title: 'Desktop',
        key: 'DESKTOP',
        url: Routes.DESKTOP,
        type: 'PRIMARY',
        icon: <FaDesktop className="nav-item-icon" />,
      },
      {
        title: 'Help',
        key: 'HELP',
        url: Routes.HELP,
        type: 'PRIMARY',
        icon: <MdHelp className="nav-item-icon" />,
      },
      {
        title: 'Settings',
        key: 'SETTINGS',
        url: Routes.SETTINGS_PROFILE_TAB,
        icon: <FaCog className="nav-item-icon" />,
        type: 'SECONDARY',
      },
    ],
  }
}

export type MenuProps = {}

export const Menu: React.FunctionComponent<MenuProps> = () => {
  const location = useLocation()
  const menuConfigs = generateMenuConfig(location)
  if (location.pathname === Routes.INVITE) return null
  return <Sidebar {...menuConfigs} location={location} />
}

export default Menu
