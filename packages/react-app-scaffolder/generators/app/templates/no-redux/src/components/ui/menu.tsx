import * as React from 'react'
<<<<<<< HEAD
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { Location } from 'history'
import { FaSignOutAlt, FaCloud } from 'react-icons/fa'
import { LoginMode } from '@reapit/cognito-auth'
import { useAuthContext } from '@/context/authContext'
=======
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu as Sidebar, MenuConfig, LoginMode, ReapitLogo } from '@reapit/elements'
import { authLogout } from '@/actions/auth'
import { Location } from 'history'
import { FaSignOutAlt, FaCloud } from 'react-icons/fa'
import { ReduxState } from '../../types/core'
>>>>>>> temp

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
<<<<<<< HEAD
          (window.location.href = window.location.href.includes('dev') || window.location.href.includes('localhost')
            ? 'https://dev.marketplace.reapit.cloud/client/installed'
            : 'https://marketplace.reapit.cloud/client/installed'),
=======
          (window.location.href = !window.location.href.includes('dev')
            ? 'https://marketplace.reapit.com/client/installed'
            : 'https://dev.marketplace.reapit.com/client/installed'),
>>>>>>> temp
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

<<<<<<< HEAD
export type MenuProps = RouteComponentProps

export const Menu: React.FunctionComponent<MenuProps> = ({ location }) => {
  const { refreshSession, logout } = useAuthContext()
  const mode = refreshSession?.mode || 'WEB'
  const menuConfigs = generateMenuConfig(logout, location, mode)
  return <Sidebar {...menuConfigs} location={location} />
}

export default withRouter(Menu)
=======
export interface MenuMappedActions {
  logout: () => void
}

export interface MenuMappedState {
  mode: LoginMode
}

export type MenuProps = MenuMappedActions & MenuMappedState & RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ logout, location, mode }) => {
  const logoutCallback = () => logout()
  const menuConfigs = generateMenuConfig(logoutCallback, location, mode)
  return <Sidebar {...menuConfigs} location={location} />
}

export const mapDispatchToProps = (dispatch: any): MenuMappedActions => ({
  logout: () => dispatch(authLogout()),
})

export const mapStateToProps = (state: ReduxState): MenuMappedState => ({
  mode: state?.auth?.refreshSession?.mode || 'WEB',
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))
>>>>>>> temp
