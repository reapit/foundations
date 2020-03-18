import * as React from 'react'
import Routes from '@/constants/routes'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { LoginMode } from '@reapit/cognito-auth'
import { Location } from 'history'
import { IoIosPeople } from 'react-icons/io'
import { FaSignOutAlt, FaCloud, FaHome, FaBuilding, FaClipboardList, FaDownload } from 'react-icons/fa'
import { MdWeb, MdLibraryBooks, MdLiveHelp } from 'react-icons/md'
import { AuthContext } from '@/context'

export const generateMenuConfig = (logout: () => void, location: Location<any>, mode: LoginMode): MenuConfig => {
  return {
    defaultActiveKey: 'LOGO',
    mode,
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO',
      },
      {
        title: 'Home',
        key: 'HOME',
        icon: <FaHome className="nav-item-icon" />,
        url: Routes.HOME,
        type: 'PRIMARY',
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
        title: 'Sources',
        key: 'SOURCES',
        icon: <FaClipboardList className="nav-item-icon" />,
        url: Routes.SOURCES,
        type: 'PRIMARY',
      },
      {
        title: 'Marketing',
        key: 'MARKETING',
        icon: <MdWeb className="nav-item-icon" />,
        url: Routes.MARKETING,
        type: 'PRIMARY',
      },
      {
        title: 'Lettings',
        key: 'LETTINGS',
        icon: <MdLibraryBooks className="nav-item-icon" />,
        url: Routes.LETTINGS,
        type: 'PRIMARY',
      },
      {
        title: 'Support',
        key: 'SUPPORT',
        icon: <MdLiveHelp className="nav-item-icon" />,
        url: Routes.SUPPORT,
        type: 'PRIMARY',
      },
      {
        title: 'Install',
        key: 'INSTALL',
        icon: <FaDownload className="nav-item-icon" />,
        url: Routes.INSTALL,
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

export type MenuProps = RouteComponentProps

export const Menu: React.FC<MenuProps> = ({ location }: MenuProps) => {
  const { logout, loginSession } = React.useContext(AuthContext)
  const mode = loginSession?.mode || 'WEB'

  const menuConfigs = generateMenuConfig(logout, location, mode)
  return <Sidebar {...menuConfigs} location={location} />
}

export default withRouter(Menu) as any
