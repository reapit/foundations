import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { Location } from 'history'
import { FaSignOutAlt, FaCloud } from 'react-icons/fa'
import { LoginMode } from '@reapit/cognito-auth'
import { useAuthContext } from '@/context/authContext'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  mode: LoginMode,
): MenuConfig => {
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
        title: 'Apps',
        key: 'APPS',
        icon: <FaCloud className="nav-item-icon" />,
        callback: () =>
          (window.location.href = window.location.href.includes('dev') || window.location.href.includes('localhost')
            ? 'https://dev.marketplace.reapit.cloud/client/installed'
            : 'https://marketplace.reapit.cloud/client/installed'),
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
  const { refreshSession, logout } = useAuthContext()
  const mode = refreshSession?.mode || 'WEB'
  const menuConfigs = generateMenuConfig(logout, location, mode)
  return <Sidebar {...menuConfigs} location={location} />
}

export default withRouter(Menu)
