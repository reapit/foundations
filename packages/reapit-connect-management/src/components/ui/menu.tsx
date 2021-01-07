import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReapitLogo, Menu as Sidebar, MenuConfig } from '@reapit/elements'
import { FaSignOutAlt, FaHome, FaUser, FaStoreAlt, FaCloud } from 'react-icons/fa'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Location } from 'history'
import Routes from '../../constants/routes'
import { menuItemOverflow } from './__styles__'

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? 'https://marketplace.dev.paas.reapit.cloud/installed'
      : 'https://marketplace.reapit.cloud/installed')

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  mode: Pick<MenuConfig, 'mode'>['mode'],
): any => {
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
        title: 'Offices',
        key: 'OFFICES',
        url: Routes.OFFICES,
        type: 'PRIMARY',
        icon: <FaHome className="nav-item-icon" />,
      },
      {
        title: 'Users',
        key: 'USERS',
        url: Routes.USERS,
        type: 'PRIMARY',
        icon: <FaUser className="nav-item-icon" />,
      },
      {
        title: <div className={menuItemOverflow}>Marketplace</div>,
        key: 'MARKETPLACE',
        icon: <FaStoreAlt className="nav-item-icon" />,
        url: Routes.MARKETPLACE,
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
        callback: logoutCallback,
        icon: <FaSignOutAlt className="nav-item-icon" />,
        type: 'SECONDARY',
      },
    ],
  }
}

export type MenuProps = RouteComponentProps

export const Menu: React.FunctionComponent<MenuProps> = ({ location }) => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const mode = connectIsDesktop ? 'DESKTOP' : 'WEB'
  const menuConfigs = generateMenuConfig(connectLogoutRedirect, location, mode) || {}
  return <Sidebar {...menuConfigs} location={location} />
}

export default withRouter(Menu)
