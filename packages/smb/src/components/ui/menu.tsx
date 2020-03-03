import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { LoginMode } from '@reapit/cognito-auth'
import { Location } from 'history'
import { FaSignOutAlt, FaCloud } from 'react-icons/fa'

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
          (window.location.href =
            window.location.href.includes('dev') || window.location.href.includes('localhost')
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

export type DispatchProps = {
  logout: () => void
}

export type StateProps = {
  mode: LoginMode
}

export type MenuProps = DispatchProps & StateProps & RouteComponentProps & {}

export const logoutCallback = logout => () => logout()

export const Menu: React.FC<MenuProps> = ({ logout, location, mode }: MenuProps) => {
  const menuConfigs = generateMenuConfig(logoutCallback(logout), location, mode)
  return <Sidebar {...menuConfigs} location={location} />
}

export default withRouter(Menu) as any
