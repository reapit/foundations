import * as React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import Routes from '@/constants/routes'
import { Location } from 'history'
import { FaCloud, FaCloudDownloadAlt, FaClipboardList } from 'react-icons/fa'
import { IoIosPeople } from 'react-icons/io'
import { selectIsAdmin, selectDeveloperId, selectClientId } from '@/selector/auth'
import { useReapitConnect } from '@reapit/connect-session'
import domvsLogo from '@/assets/images/Domvs.jpg'

// This is a really naff hack to hardcode our first client logo into the menu. Remove when we have a
// logo upload and API
const SettingsIcon: React.FC<{ clientId: string }> = ({ clientId }) => {
  return clientId === 'DOM' ? (
    <img src={domvsLogo} />
  ) : clientId === 'RPT' ? (
    <ReapitLogo className="nav-item-icon" />
  ) : (
    <IoIosPeople className="nav-item-icon" />
  )
}

export const generateMenuConfig = (location: Location<any>, isAdmin: boolean, clientId: string): MenuConfig => {
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
        key: 'SETTINGS',
        url: Routes.SETTINGS,
        icon: <SettingsIcon clientId={clientId} />,
        type: 'SECONDARY',
      },
    ],
  }
}

export interface MenuMappedActions {
  logout: () => void
}

export type MenuProps = {}

export const Menu: React.FunctionComponent<MenuProps> = () => {
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isDesktopAdmin = selectIsAdmin(connectSession)
  const clientId = selectClientId(connectSession)

  const isDeveloperEdition = Boolean(selectDeveloperId(connectSession))
  const isAdmin = isDesktopAdmin || isDeveloperEdition

  const menuConfigs = generateMenuConfig(location, isAdmin, clientId)

  // invalid login type. E.g. admin view marketplace apps

  return <Sidebar {...menuConfigs} location={location} />
}

export default Menu
