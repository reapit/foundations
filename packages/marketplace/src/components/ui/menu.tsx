import * as React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import Routes from '../../constants/routes'
import { Location } from 'history'
import { FaCloud, FaCloudDownloadAlt, FaCog, FaClipboardList } from 'react-icons/fa'
import { MdHelp } from 'react-icons/md'
import { selectIsAdmin, selectDeveloperId } from '@/selector/auth'
import { useReapitConnect } from '@reapit/connect-session'

export const generateMenuConfig = (location: Location<any>, isAdmin: boolean): MenuConfig => {
  return {
    defaultActiveKey: 'BROWSE_APPS',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO',
      },
      {
        title: 'Browse',
        key: 'BROWSE_APPS',
        url: Routes.APPS,
        type: 'PRIMARY',
        icon: <FaCloud className="nav-item-icon" />,
      },
      {
        title: 'Installed',
        key: 'INSTALLED',
        url: Routes.INSTALLED_APPS,
        type: 'PRIMARY',
        icon: <FaCloudDownloadAlt className="nav-item-icon" />,
      },
      {
        title: 'Manage',
        key: 'MY_APPS',
        url: Routes.MY_APPS,
        type: 'PRIMARY',
        icon: <FaClipboardList className="nav-item-icon" />,
        disabled: !isAdmin,
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
        url: Routes.SETTINGS,
        icon: <FaCog className="nav-item-icon" />,
        type: 'SECONDARY',
      },
    ],
  }
}

export interface MenuMappedActions {
  logout: () => void
}

export type MenuProps = {}

// remove
export const Menu: React.FunctionComponent<MenuProps> = () => {
  const location = useLocation()
  // FIXME(menu) change selector
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isDesktopAdmin = selectIsAdmin(connectSession)

  /**
   * testME:
   * admin
   * client: ok
   * dev with dev edition
   */
  // TODO: developer edition login
  const isDeveloperEdition = Boolean(selectDeveloperId(connectSession))
  // FIXME(menu) select from hooks session

  // FIXME(menu) desk edition only
  // Show manage page to developer edition
  // Show admin page to developer edition
  const isAdmin = isDesktopAdmin || isDeveloperEdition

  // TESTME(menu): logout
  /**
   * login as admin -> log to client -> ^ hide manage by clearing cookie property
   */
  const menuConfigs = generateMenuConfig(location, isAdmin)

  /**
   * TESTME
   * Render menu for developer
   */
  // invalid login type. E.g. admin view marketplace apps

  return <Sidebar {...menuConfigs} location={location} />
}

export default Menu
